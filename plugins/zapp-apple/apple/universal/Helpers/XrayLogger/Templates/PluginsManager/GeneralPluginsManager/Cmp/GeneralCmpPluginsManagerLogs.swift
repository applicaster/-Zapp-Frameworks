//
//  GeneralCmpPluginsManagerLogs.swift
//  ZappApple
//
//  Created by Alex Zchut on 18/07/2021.
//  Copyright © 2021 Applicaster. All rights reserved.
//

import Foundation
import XrayLogger
import ZappCore

let cmpPluginsManagerLogsSubsystem = "\(PluginsManagerLogs.subsystem)/general_cmp_plugins"

public struct GeneralCmpPluginsManagerLogs: XrayLoggerTemplateProtocol {
    public static var subsystem: String = cmpPluginsManagerLogsSubsystem
}
