//
//  RootController+EventsBus+ForceAppReload.swift
//  ZappApple
//
//  Created by Alex Zchut on 25/07/2021
//  Copyright © 2021 Applicaster LTD. All rights reserved.
//

import Foundation
import ZappCore

extension RootController {
    fileprivate struct Constants {
        static let event = "event"
        static let old = "old"
        static let new = "new"
    }

    func subscribeToEventsBusForceAppReload() {
        EventsBus.subscribe(self,
                            type: EventsBusType(.forceAppReload),
                            handler: { content in
                                self.forceReloadApplication()
                            })
    }
    
    func forceReloadApplication() {
        makeSplashAsRootViewContoroller()
        reloadApplication()
    }
}
