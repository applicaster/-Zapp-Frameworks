//
//  ReachabilityManagerLogs.swift
//  ZappApple
//
//  Created by Alex Zchut on 26/07/2021.
//  Copyright © 2021 Applicaster LTD. All rights reserved.
//

import Foundation
import XrayLogger
import ZappCore

public struct ReachabilityManagerLogs: XrayLoggerTemplateProtocol {
    public static var subsystem: String = "\(kNativeSubsystemPath)/reachability_manager"
    
    public static var startedObserving = LogTemplate(message: "Started observing")
    public static var connectionChange = LogTemplate(message: "Connection change")

}
