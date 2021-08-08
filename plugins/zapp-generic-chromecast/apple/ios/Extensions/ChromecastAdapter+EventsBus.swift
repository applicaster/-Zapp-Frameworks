//
//  ChromecastAdapter+EventsBus.swift
//  ZappChromecast
//
//  Created by Alex Zchut on 25/07/2021.
//

import Foundation
import ZappCore

extension ChromecastAdapter {
    fileprivate struct Constants {
        static let event = "event"
        static let new = "new"
    }

    func subscribeToEventsBus() {
        EventsBus.subscribe(self,
                            type: EventsBusType(.reachabilityChanged),
                            handler: { content in
                                guard let eventDetails = self.fetchEventDetails(from: content),
                                      let new = eventDetails.data?[Constants.new] as? ConnectivityState else {
                                    return
                                }
                                
                                self.connectivityState = new
                            })
    }
    
    fileprivate func fetchEventDetails(from content: Notification?) -> EventsBus.Event? {
        return content?.userInfo?["event"] as? EventsBus.Event
    }
}
