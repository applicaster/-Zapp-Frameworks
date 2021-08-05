//
//  OfflineAssetsBridge.swift
//  QuickBrickApple
//
//  Created by Alex Zchut on 04/08/2021.
//

import Foundation
import React
import ZappCore

@objc(OfflineAssetsBridge)
class OfflineAssetsBridge: NSObject, RCTBridgeModule {
    var tasks: [FetchTask] = [FetchTask]()
    var taskOptions: [FetchTaskOption] = [FetchTaskOption]()

    struct Params {
        static let file = "file"
        static let url = "url"
    }

    static func moduleName() -> String! {
        return "OfflineAssetsBridge"
    }

    public class func requiresMainQueueSetup() -> Bool {
        return true
    }

    /// prefered thread on which to run this native module
    @objc public var methodQueue: DispatchQueue {
        return DispatchQueue.main
    }

    @objc public func storeFiles(_ filesList: [[String: Any]]?,
                                 options: [String: Any]?,
                                 resolver: @escaping RCTPromiseResolveBlock,
                                 rejecter: @escaping RCTPromiseRejectBlock) {
        // Request Header configuration:
        let configuration = URLSessionConfiguration.default
        let session = URLSession(configuration: configuration)
        let cachePolicy = URLRequest.CachePolicy.returnCacheDataElseLoad
        let dispatchQueue = DispatchQueue(label: "com.applicaster.OfflineAssetsBridge", qos: .default, attributes: .concurrent)
        let dispatchGroup = DispatchGroup()

        guard let files = filesList, files.count > 0 else {
            rejecter("failed to fetch files",
                     "files arrray is empty",
                     nil)
            return
        }

        taskOptions = parseTaskOptions(with: options)

        tasks.removeAll()
        files.forEach { item in
            if let urlString = item[Params.url] as? String,
               let url = URL(string: urlString),
               let filePath = item[Params.file] as? String {
                let filePathUrl = URL(fileURLWithPath: filePath.replacingOccurrences(of: "file://", with: ""))
                let task = FetchTask(url: url,
                                     saveTo: filePathUrl,
                                     options: taskOptions)
                tasks.append(task)
            }
        }

        tasks.forEach { task in
            task.start(on: session,
                       cachePolicy: cachePolicy,
                       queue: dispatchQueue,
                       group: dispatchGroup)
        }

        dispatchGroup.notify(queue: .main) { [unowned self] in
            let completedTasks = self.tasks.filter { $0.state == .completed }
            if completedTasks.count == self.tasks.count {
                let responseObj = completedTasks.map { ["\($0.url.absoluteString)": true] }
                resolver(responseObj)
            } else {
                rejecter("some file failed",
                         "",
                         nil)
            }
        }
    }

    @objc public func getFilesDirectory(_ resolver: @escaping RCTPromiseResolveBlock,
                                        rejecter: @escaping RCTPromiseRejectBlock) {
        let folderName = "OfflineAssets"

        if let folderUrl = FileManager.default.getContentFolder(appendingFolderName: folderName) {
            resolver(folderUrl.relativePath)
        } else {
            rejecter("unable to get directory path",
                     "",
                     nil)
        }
    }

    @objc public func delete(_ path: String?,
                             resolver: @escaping RCTPromiseResolveBlock,
                             rejecter: @escaping RCTPromiseRejectBlock) {
        var success = false
        let fileManager = FileManager.default

        guard let path = path else {
            rejecter("failed to delete file",
                     "File path was not provided",
                     nil)
            return
        }

        let url = URL(fileURLWithPath: path.replacingOccurrences(of: "file://", with: ""))
        guard fileManager.fileExists(atPath: url.path) == true else {
            rejecter("failed to delete file",
                     "File not exists at path: \(String(describing: path))",
                     nil)
            return
        }

        do {
            try fileManager.removeItem(at: url)
            success = true
        } catch {
            success = false
        }

        if success {
            resolver(true)
        } else {
            rejecter("failed to delete file",
                     "Failed to delete file at path: \(path)",
                     nil)
        }
    }

    fileprivate func parseTaskOptions(with options: [String: Any]?) -> [FetchTaskOption] {
        var retValue: [FetchTaskOption] = [FetchTaskOption]()

        if let boolValue = options?["overrideExistingFiles"] as? Bool,
           boolValue == true {
            retValue.append(.overrideExistingFiles)
        }

        if let boolValue = options?["abortOnFail"] as? Bool,
           boolValue == true {
            retValue.append(.abortOnFail)
        }

        return retValue
    }
}
