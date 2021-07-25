//
//  RootViewController+ReachabilityManagerDelegate.swift
//  ZappApple
//
//  Created by Anton Kononenko on 6/10/19.
//  Copyright © 2019 Applicaster LTD. All rights reserved.
//

import Foundation
import ZappCore

extension RootController {
    fileprivate struct Constants {
        static let event = "event"
        static let old = "old"
        static let new = "new"
    }

    func subscribeToReachabilityChange() {
        EventsBus.subscribe(self,
                            type: EventsBusType(.reachabilityChanged),
                            handler: { content in
                                guard let eventDetails = self.fetchEventDetails(from: content),
                                      let old = eventDetails.data?[Constants.old] as? ConnectivityState,
                                      let new = eventDetails.data?[Constants.new] as? ConnectivityState else {
                                    return
                                }

                                self.stateChanged(from: old, to: new)
                            })
    }

    fileprivate func fetchEventDetails(from content: Notification?) -> EventsBus.Event? {
        return content?.userInfo?[Constants.event] as? EventsBus.Event
    }

    fileprivate func stateChanged(from old: ConnectivityState, to new: ConnectivityState) {
        switch new {
        case .cellular, .wifi:
            if old == .offline {
                forceReloadApplication()
            }
        case .offline:
            showInternetError()
        }
    }

    func showInternetError() {
        showErrorMessage(message: "You are not connected to a network. Please use your device settings to connect to a network and try again.")
    }

    func forceReloadApplication() {
        makeSplashAsRootViewContoroller()
        reloadApplication()
    }
}
