//
//  RootController+EventsBus.swift
//  ZappApple
//
//  Created by Alex Zchut on 25/07/2021.
//

import Foundation

extension RootController {
    func subscribeToEventsBus() {
        subscribeToEventsBusReachabilityChanges()
        subscribeToEventsBusForceAppReload()
    }
}
