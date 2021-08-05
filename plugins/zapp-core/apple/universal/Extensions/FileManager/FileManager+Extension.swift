//
//  FileManager+Extension.swift
//  ZappCore
//
//  Created by Alex Zchut on 05/08/2021.
//

import Foundation

extension FileManager {
    public func createFolderStructureIfNeeded(forFileUrl fileUrl: URL) -> Result<String, Error> {
        let dirPath = fileUrl.deletingLastPathComponent().relativePath
        return createFolderIfNeeded(atPath: dirPath)
    }

    public func getContentFolder(appendingFolderName folderName: String) -> URL? {
        var folderUrl: URL?
        // https://developer.apple.com/library/archive/documentation/General/Conceptual/AppleTV_PG/index.html#//apple_ref/doc/uid/TP40015241
        #if os(tvOS)
            folderUrl = NSSearchPathForDirectoriesInDomains(.cachesDirectory, .userDomainMask, true).appendingPathComponent(folderName)
        #else
            if let baseUrl = urls(for: .documentDirectory,
                                  in: .userDomainMask).first {
                let localFolderUrl = baseUrl.appendingPathComponent(folderName)

                switch createFolderIfNeeded(atPath: localFolderUrl.relativePath) {
                case let .success(path):
                    folderUrl = URL(fileURLWithPath: path)
                default:
                    break
                }
            }
        #endif
        return folderUrl
    }

    func createFolderIfNeeded(atPath path: String) -> Result<String, Error> {
        var retValue: Result<String, Error> = .success(path)
        if !fileExists(atPath: path) {
            do {
                try createDirectory(atPath: path, withIntermediateDirectories: true, attributes: nil)
            } catch let error {
                retValue = .failure(error)
            }
        }
        return retValue
    }
}
