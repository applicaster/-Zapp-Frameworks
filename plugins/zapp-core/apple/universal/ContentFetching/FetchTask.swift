//
//  FetchTask.swift
//  ZappCore
//
//  Created by Alex Zchut on 05/08/2021.
//  Copyright © 2021 Applicaster LTD. All rights reserved.
//

import Foundation

public class FetchTask {
    public var url: URL
    public var saveTo: URL
    public var state = FetchTaskState.pending
    var options: [FetchTaskOption]

    public init(url: URL, saveTo: URL, options: [FetchTaskOption]) {
        self.url = url
        self.saveTo = saveTo
        self.options = options
    }

    public func start(on session: URLSession,
                      cachePolicy: URLRequest.CachePolicy,
                      queue: DispatchQueue,
                      group: DispatchGroup) {
        let request = URLRequest(url: url,
                                 cachePolicy: cachePolicy)

        queue.async(group: group) {
            group.enter()
            if self.options.contains(.overrideExistingFiles) == false,
               FileManager.default.fileExists(atPath: self.saveTo.path) {
                self.state = .completed
                group.leave()
            } else {
                let task = session.dataTask(with: request) { data, response, error in
                    if let data = data,
                       let httpResponse = response as? HTTPURLResponse {
                        if httpResponse.statusCode == 200 {
                            do {
                                switch FileManager.default.createFolderStructureIfNeeded(forFileUrl: self.saveTo) {
                                case .success:
                                    try data.write(to: self.saveTo, options: .atomic)
                                    self.state = .completed
                                case let .failure(error):
                                    self.state = .failed(error)
                                }
                            } catch let error {
                                self.state = .failed(error)
                            }
                        }

                    } else if let error = error {
                        self.state = .failed(error)
                    }

                    group.leave()
                }
                task.resume()
            }
        }
    }
}

public enum FetchTaskOption {
    case overrideExistingFiles
    case abortOnFail
}
