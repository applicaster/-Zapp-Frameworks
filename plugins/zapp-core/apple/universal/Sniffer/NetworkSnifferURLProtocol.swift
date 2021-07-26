//
//  NetworkSnifferURLProtocol.swift
//  ZappCore
//
//  Created by Alex Zchut on 18/07/2021.
//

import Foundation

public class NetworkSnifferURLProtocol: URLProtocol {
    var session: URLSession?
    var sessionTask: URLSessionDataTask?
    var logItem: HTTPLogItem?
    
    private enum Keys {
        static let request = "NetworkSniffer.request"
    }
    
    override init(request: URLRequest, cachedResponse: CachedURLResponse?, client: URLProtocolClient?) {
        super.init(request: request, cachedResponse: cachedResponse, client: client)

        if session == nil {
            session = URLSession(configuration: .default)
        }
    }

    override public class func canInit(with request: URLRequest) -> Bool {
        guard let url = request.url else { return false }
        guard !NetworkSniffer.shared.shouldIgnoreDomain(with: url) else { return false }
        guard !NetworkSniffer.shared.shouldIgnoreExtensions(with: url) else { return false }

        return property(forKey: Keys.request, in: request) == nil
    }

    override public class func canonicalRequest(for request: URLRequest) -> URLRequest {
        return request
    }

    override public func startLoading() {
        guard let urlRequest = (request as NSURLRequest).mutableCopy() as? NSMutableURLRequest, logItem == nil else { return }

        logItem = HTTPLogItem(request: urlRequest as URLRequest)
        NetworkSnifferURLProtocol.setProperty(true, forKey: Keys.request, in: urlRequest)

        sessionTask = session?.dataTask(with: urlRequest as URLRequest, completionHandler: { data, response, error in
            if let data = data, let response = response {
                self.logItem?.didComplete(withResult: .success((response: response, data: data)))
                self.client?.urlProtocol(self, didReceive: response, cacheStoragePolicy: .allowed)
                self.client?.urlProtocol(self, didLoad: data)
            } else if let error = error {
                self.logItem?.didComplete(withResult: .failure(error))
                self.client?.urlProtocol(self, didFailWithError: error)
            }
            self.client?.urlProtocolDidFinishLoading(self)
        })
        sessionTask?.resume()
    }

    override public func stopLoading() {
        sessionTask?.cancel()
        DispatchQueue.main.async {
            self.session?.invalidateAndCancel()
        }
    }
}
