//
//  AdobeAnalyticsScreenEventsHandler.swift
//  ZappAnalyticsPluginAdobe
//
//  Created by Alex Zchut on 10/08/2021.
//  Copyright © 2021 Applicaster. All rights reserved.
//

import ACPCore
import Foundation
import ZappCore

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

        ACPCore.trackState(eventName, data: parameters)

        return super.proceedEvent(eventName)
    }
}
