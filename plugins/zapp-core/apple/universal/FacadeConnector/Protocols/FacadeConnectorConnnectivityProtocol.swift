//
//  FacadeConnectorConnnectivityProtocol.swift
//  ZappCore
//
//  Created by Alex Zchut on 29/03/2020.
//

import Foundation

public protocol FacadeConnectorConnnectivityProtocol {
    /**
     Get online status
     */
    func isOnline() -> Bool
    /**
     Get offline status
     */
    func isOffline() -> Bool
    /**
     Get current connectivity state
     */
    func getCurrentConnectivityState() -> ConnectivityState
    /**
     Set needs restart flag, will be handled by QB side to restart when needed
     */
    func setNeedsRestartAfterOffline()
}
