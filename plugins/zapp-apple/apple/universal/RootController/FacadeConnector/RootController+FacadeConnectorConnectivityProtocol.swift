//
//  RootController+FacadeConnectorConnectivityProtocol.swift
//  ZappApple
//
//  Created by Alex Zchut on 29/03/2020.
//

import Foundation
import ZappCore

extension RootController: FacadeConnectorConnnectivityProtocol {
    public func isOnline() -> Bool {
        var revValue = false

        switch reachabilityManager.currentConnection {
        case .connected:
            revValue = true
        default:
            break
        }

        return revValue
    }

    public func isOffline() -> Bool {
        return !isOnline()
    }

    public func getCurrentConnectivityState() -> ConnectivityState {
        return reachabilityManager.currentConnection.connectivityState
    }
}
