//
//  ReachabilityManager.swift
//  ZappApple
//
//  Created by Anton Kononenko on 6/10/19.
//  Copyright © 2019 Applicaster LTD. All rights reserved.
//

import Foundation
import Network
import ZappCore

class ReachabilityManager {
    let monitor: NWPathMonitor?
    var currentConnection: ReachabilityState = .connected([.wifi])

    init() {
        self.monitor = NWPathMonitor()
        startObserve()
    }

    func startObserve() {
        monitor?.pathUpdateHandler = { path in
            var connection:ReachabilityState = .disconnected
            if path.status == .satisfied {
                let interfaceTypes = path.availableInterfaces.map(\.type)
                connection = .connected(interfaceTypes)
            } else {
                connection = .disconnected
            }
            
            self.postConnectionChange(from: self.currentConnection, to: connection)
            
            //update current connection
            self.currentConnection = connection
            
        }
        
        let queue = DispatchQueue(label: "ReachabilityMonitor")
        monitor?.start(queue: queue)
    }
    
    fileprivate func postConnectionChange(from old: ReachabilityState, to new: ReachabilityState) {
        let event = EventsBus.Event(type: EventsBusType(.reachabilityChanged),
                                    data: ["old": old.connectivityState,
                                           "new": new.connectivityState])
        EventsBus.post(event)
    }
}
