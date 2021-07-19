//
//  NetworkSniffer.swift
//  ZappApple
//
//  Created by Alex Zchut on 24/02/2021.
//

import Foundation

public class NetworkSniffer: NSObject {
    public static var shared = NetworkSniffer()

    public enum LogType: String {
        case request, response
    }

    private static var bodyDeserializers: [String: BodyDeserializer] = [
        "application/x-www-form-urlencoded": PlainTextBodyDeserializer(),
        "*/json": JSONBodyDeserializer(),
        "image/*": UIImageBodyDeserializer(),
        "text/plain": PlainTextBodyDeserializer(),
        "*/html": HTMLBodyDeserializer(),
        "multipart/form-data; boundary=*": MultipartFormDataDeserializer(),
    ]

    public var onLogger: ((URL, LogType, [String: Any]) -> Void)? // If the handler is registered, the log inside the Sniffer will not be output.
    private var ignoredDomains: [String] = []
    private var ignoredExtensions: [String] = []

    public func start(with eventHandler: ((URL, LogType, [String: Any]) -> Void)?,
                      ignoredDomains domains: [String],
                      ignoredExtensions extensions: [String]) {
        onLogger = eventHandler
        ignoredDomains = domains
        ignoredExtensions = extensions

        URLSessionConfiguration.setupSwizzledSessionConfiguration()
    }

    static func find(deserialize contentType: String) -> BodyDeserializer? {
        for (pattern, deserializer) in NetworkSniffer.bodyDeserializers {
            do {
                let regex = try NSRegularExpression(pattern: pattern.replacingOccurrences(of: "*", with: "[a-z]+"))
                let results = regex.matches(in: contentType, range: NSRange(location: 0, length: contentType.count))

                if !results.isEmpty {
                    return deserializer
                }
            } catch {
                continue
            }
        }

        return nil
    }

    public func shouldIgnoreDomain(with url: URL) -> Bool {
        guard !ignoredDomains.isEmpty,
              let host = url.host else {
            return false
        }
        return ignoredDomains.first { $0.range(of: host) != nil } != nil
    }

    public func shouldIgnoreExtensions(with url: URL) -> Bool {
        guard !ignoredExtensions.isEmpty else {
            return false
        }

        return ignoredExtensions.contains(url.pathExtension.lowercased()) || url.pathExtension.isEmpty
    }
}
