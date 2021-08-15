//
//  AdobeAnalyticsScreenEventsHandler.swift
//  ZappAnalyticsPluginAdobe
//
//  Created by Alex Zchut on 10/08/2021.
//

import Foundation
import ZappCore
import AEPCore

class AdobeAnalyticsScreenEventsHandler: AnalyticsScreenEventsHandler {
    override func handleSomeScreenEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return proceedScreenEvent(eventName,
                                  parameters: parameters)
    }

    override func handleHomeEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return proceedScreenEvent(eventName,
                                  parameters: parameters)
    }

    override func handleWebPageLoadedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return proceedScreenEvent(eventName,
                                  parameters: parameters)
    }

    override func handleTapNavbarBackButtonEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return proceedScreenEvent(eventName,
                                  parameters: parameters)
    }

    fileprivate func proceedScreenEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard let parameters = parameters as? [String: String] else {
            return false
        }

        MobileCore.track(state: eventName, data: parameters)

        return super.proceedEvent(eventName)
    }
}
