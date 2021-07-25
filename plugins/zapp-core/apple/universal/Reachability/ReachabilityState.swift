//
//  ReachabilityState.swift
//  ZappCore
//
//  Created by Alex Zchut on 28/06/2021.
//  Copyright © 2021 Applicaster Ltd. All rights reserved.
//

import Foundation
import Network

public enum ReachabilityState: Equatable {
    case connected(_ interfaces: [NWInterface.InterfaceType])
    case disconnected

    public static func == (lhs: ReachabilityState, rhs: ReachabilityState) -> Bool {
        switch (lhs, rhs) {
        case let (.connected(a1), .connected(a2)):
            return a1 == a2
        case (.disconnected, .disconnected):
            return true
        default:
            return false
        }
    }

    public var description: String {
        var retValue = ""
        switch self {
        case .connected:
            retValue = "connected"
        case .disconnected:
            retValue = "disconnected"
        }
        return retValue
    }
    
    public var connectivityState: ConnectivityState {
        var retValue: ConnectivityState = .cellular

        switch self {
        case let .connected(connections):
            if connections.contains(.cellular) {
                retValue = .cellular
            }
            
            if connections.contains(.wifi) {
                retValue = .wifi
            }
        case .disconnected:
            retValue = .offline
        }
        return retValue
    }
}
