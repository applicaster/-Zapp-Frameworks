//
//  GeneralStoragePluginsManager.swift
//  ZappApple
//
//  Created by Alex Zchut on 18/07/2021.
//  Copyright © 2021 Applicaster. All rights reserved.
//

import UIKit
import XrayLogger
import ZappCore

public typealias GeneralStorageManagerPreparationCompletion = () -> Void

public class GeneralStoragePluginsManager: PluginManagerBase {
    typealias pluginTypeProtocol = GeneralStorageProviderProtocol
    var _providers: [String: GeneralStorageProviderProtocol] {
        return providers as? [String: GeneralStorageProviderProtocol] ?? [:]
    }

    public required init() {
        super.init()
        pluginType = .General$Storage
        logger = Logger.getLogger(for: GeneralStoragePluginsManagerLogs.subsystem)
    }
}
