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
    func subscribeToEventsBusForceAppReload() {
        EventsBus.subscribe(self,
                            type: EventsBusType(.forceAppReload),
                            handler: { _ in
                                self.forceReloadApplication()
                            })

        EventsBus.subscribe(self,
                            type: EventsBusType(.forceAppReloadAfterOfflineStart),
                            handler: { _ in
                                self.forceReloadApplicationAfterOfflineStart()
                            })
    }

    func forceReloadApplication() {
        makeSplashAsRootViewContoroller()
        reloadApplication()
    }

    func forceReloadApplicationAfterOfflineStart() {
        let key = RootControllerStorageKeys.shouldRestartAfterOfflineStart

        guard sessionStorageValue(for: key,
                                  namespace: nil)?.boolValue() == false,
            isOnline() else {
            return
        }

        _ = SessionStorage.sharedInstance.removeItem(key: key,
                                                     namespace: nil)
        forceReloadApplication()
    }
}
