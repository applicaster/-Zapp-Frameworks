//
//  NetworkRequestsManager.swift
//  ZappApple
//
//  Created by Alex Zchut on 23/02/2021.
//  Copyright © 2021 Applicaster LTD. All rights reserved.
//

import Foundation
import XrayLogger
import ZappCore

public class NetworkRequestsManager {
    static var shared = NetworkRequestsManager()

    lazy var logger = Logger.getLogger(for: NetworkRequestsManagerLogs.subsystem)
    var pendingRequests: [String: [String: Any]]?
    lazy var networkShiffer = NetworkSniffer.shared
    var loggerEventsQueue: DispatchQueue = DispatchQueue.init(label: "NetworkRequestsManagerLoggerEventsQueue")

    struct Params {
        static let request = "request"
        static let response = "response"
        static let error = "error"
        static let statusCode = "statusCode"
        static let url = "url"
    }

    public func startListening() {
//        guard networkRequestsLoggingEnabled == true else {
//            return
//        }
        pendingRequests = [String: [String: Any]]()
        
        let eventHandler = { (url: URL, logType: NetworkSniffer.LogType, content: [String: Any]) in
            switch logType {
            case .request:
                self.pendingRequests?[url.absoluteString.md5()] = content
            case .response:
                let key = url.absoluteString.md5()
                guard let request = self.pendingRequests?.removeValue(forKey: key),
                      let response = content[Params.response] as? [String: Any],
                      let statusCode = response[Params.statusCode] as? String else {
                    return
                }

                self.loggerEventsQueue.sync {
                    self.logger?.verboseLog(message: "\(NetworkRequestsManagerLogs.request.message): \(url.host ?? "")",
                                            category: NetworkRequestsManagerLogs.request.category,
                                            data: [Params.request: request,
                                                   Params.response: response,
                                                   Params.statusCode: statusCode,
                                                   Params.url: url.absoluteString])
                }
                
            }
        }
        NetworkSniffer.shared.start(with: eventHandler,
                                    ignoredDomains: ignoredDomains,
                                    ignoredExtensions: ignoredExtensions)
    }

    var networkRequestsLoggingEnabled: Bool {
        let key = "networkRequestsEnabled"
        return UserDefaults.standard.bool(forKey: key)
    }

    var ignoredExtensions: [String] {
        let pluginNameSpace = "xray_logging_plugin"
        let key = "networkRequestsIgnoredExtensions"
        let defaultExtensions = ["png", "jpeg", "jpg", "ts"]
        guard let networkRequestsIgnoredExtensionsString = FacadeConnector.connector?.storage?.localStorageValue(for: key,
                                                                                                                 namespace: pluginNameSpace) else {
            _ = FacadeConnector.connector?.storage?.localStorageSetValue(for: key,
                                                                         value: defaultExtensions.joined(separator: ";"),
                                                                         namespace: pluginNameSpace)
            return defaultExtensions
        }
        return networkRequestsIgnoredExtensionsString.components(separatedBy: ";").filter({ !$0.isEmpty })
    }

    var ignoredDomains: [String] {
        let pluginNameSpace = "xray_logging_plugin"
        let key = "networkRequestsIgnoredDomains"
        guard let networkRequestsIgnoredDomainsString = FacadeConnector.connector?.storage?.localStorageValue(for: key,
                                                                                                              namespace: pluginNameSpace) else {
            return []
        }
        return networkRequestsIgnoredDomainsString.components(separatedBy: ";").filter({ !$0.isEmpty })
    }
}
