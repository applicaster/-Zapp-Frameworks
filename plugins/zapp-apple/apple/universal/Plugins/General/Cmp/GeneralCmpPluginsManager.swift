//
//  GeneralCmpPluginsManager.swift
//  ZappApple
//
//  Created by Alex Zchut on 18/07/2021.
//  Copyright © 2021 Applicaster. All rights reserved.
//

import UIKit
import XrayLogger
import ZappCore

public typealias GeneralCmpManagerPreparationCompletion = () -> Void

public class GeneralCmpPluginsManager: PluginManagerBase {
    typealias pluginTypeProtocol = GeneralCmpProviderProtocol
    var _providers: [String: GeneralCmpProviderProtocol] {
        return providers as? [String: GeneralCmpProviderProtocol] ?? [:]
    }

    public required init() {
        super.init()
        pluginType = .General$Cmp
        logger = Logger.getLogger(for: GeneralCmpPluginsManagerLogs.subsystem)
    }
}
