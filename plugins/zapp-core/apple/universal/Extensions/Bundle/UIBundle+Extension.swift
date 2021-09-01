//
//  UIBundle+Extension.swift
//  ZappCore
//
//  Created by Anton Kononenko on 16/08/2021.
//

import UIKit

extension Bundle {
    public static let externalURLSchemes: [String] = {
        guard let urlTypes = main.infoDictionary?["CFBundleURLTypes"] as? [[String: Any]] else {
            return []
        }

        var result: [String] = []
        for urlTypeDictionary in urlTypes {
            guard let urlSchemes = urlTypeDictionary["CFBundleURLSchemes"] as? [String] else { continue }
            guard let externalURLScheme = urlSchemes.first else { continue }
            result.append(externalURLScheme)
        }

        return result
    }()

    public static var stringifyExternalURLSchemes: String? {
        let urlSchemes = externalURLSchemes
        guard let data = try? JSONSerialization.data(withJSONObject: urlSchemes, options: []) else {
            return nil
        }
        return String(data: data, encoding: String.Encoding.utf8)
    }
}
