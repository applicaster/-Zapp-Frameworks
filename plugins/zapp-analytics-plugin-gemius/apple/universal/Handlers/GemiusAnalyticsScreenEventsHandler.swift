//
//  GemiusAnalyticsScreenEventsHandler.swift
//  ZappAnalyticsPluginGemius
//
//  Created by Alex Zchut on 10/08/2021.
//

import Foundation
import GemiusSDK
import ZappCore

class GemiusAnalyticsScreenEventsHandler: AnalyticsScreenEventsHandler {
    lazy var scriptIdentifier: String = {
        guard let identifier = self.delegate?.configurationJSON?[GemiusAnalyticsProviderParams.scriptIdentifier] as? String else {
            return ""
        }
        return identifier
    }()

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
                                  type: .EVENT_ACTION,
                                  parameters: parameters)
    }

    fileprivate func proceedScreenEvent(_ eventName: String, type: GEMEventType = .EVENT_FULL_PAGEVIEW, parameters: [String: Any]?) -> Bool {
        guard let parameters = parameters as? [String: String] else {
            return false
        }

        let event = GEMAudienceEvent()
        event.eventType = type
        event.scriptIdentifier = scriptIdentifier
        for (key, value) in parameters {
            if key.count > 0 && value.count > 0 {
                event.addExtraParameter(key, value: value)
            }
        }
        event.send()

        return super.proceedEvent(eventName)
    }
}
