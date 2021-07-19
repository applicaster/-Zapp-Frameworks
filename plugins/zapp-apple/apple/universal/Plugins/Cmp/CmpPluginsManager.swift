//
//  CmpPluginsManager.swift
//  ZappApple
//
//  Created by Alex Zchut on 18/07/2021.
//  Copyright © 2021 Applicaster. All rights reserved.
//

import UIKit
import XrayLogger
import ZappCore

public typealias CmpManagerPreparationCompletion = () -> Void

public class CmpPluginsManager: PluginManagerBase {
    typealias pluginTypeProtocol = CmpProviderProtocol
    var _providers: [String: CmpProviderProtocol] {
        return providers as? [String: CmpProviderProtocol] ?? [:]
    }

    public required init() {
        super.init()
        pluginType = .Cmp
        logger = Logger.getLogger(for: CmpPluginsManagerLogs.subsystem)
    }
}
