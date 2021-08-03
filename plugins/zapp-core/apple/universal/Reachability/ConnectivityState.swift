//
//  ConnectivityState.swift
//  ZappCore
//
//  Created by Alex Zchut on 25/07/2021.
//

import Foundation

@objc public enum ConnectivityState: NSInteger {
    case offline = 0
    case cellular
    case wifi
}
