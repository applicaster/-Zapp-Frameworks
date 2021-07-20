//
//  GeneralStoragePluginsManagerLogs.swift
//  ZappApple
//
//  Created by Alex Zchut on 18/07/2021.
//  Copyright © 2021 Applicaster. All rights reserved.
//

import Foundation
import XrayLogger
import ZappCore

let storagePluginsManagerLogsSubsystem = "\(PluginsManagerLogs.subsystem)/general_storage_plugins"

public struct GeneralStoragePluginsManagerLogs: XrayLoggerTemplateProtocol {
    public static var subsystem: String = storagePluginsManagerLogsSubsystem
}
