//
//  AdobeAnalyticsAdEventsHandler.swift
//  ZappAnalyticsPluginAdobe
//
//  Created by Alex Zchut on 10/08/2021.
//

import AEPMedia
import Foundation
import ZappCore

class AdobeAnalyticsAdEventsHandler: AnalyticsAdEventsHandler {
    override func handleAdBreakStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdBreakStartEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let currentPlayerPosition = getCurrentPlayerPosition(from: parameters)

        let adBreakObject = Media.createAdBreakObjectWith(name: "adbreak-name",
                                                          position: adBreakCounter,
                                                          startTime: currentPlayerPosition)

        let videoMetadata: [String: String] = [:]

        delegate?.externalObject?.trackEvent(event: .AdBreakStart, info: adBreakObject, metadata: videoMetadata)

        return proceedEvent(eventName)
    }

    override func handleAdBreakCompletedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdBreakCompletedEvent(eventName, parameters: parameters) == false else {
            return true
        }

        delegate?.externalObject?.trackEvent(event: .AdBreakComplete,
                                                          info: nil,
                                                          metadata: nil)

        return proceedEvent(eventName)
    }

    override func handleAdStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdStartEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let adObject = Media.createAdObjectWith(name: "ad-name",
                                                id: UUID().uuidString,
                                                position: adBreakCounter,
                                                length: 0)

        let videoMetadata: [String: String] = [:]

        delegate?.externalObject?.trackEvent(event: .AdStart,
                                                          info: adObject,
                                                          metadata: videoMetadata)

        return proceedEvent(eventName)
    }

    override func handleAdCompleteEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdCompleteEvent(eventName, parameters: parameters) == false else {
            return true
        }

        delegate?.externalObject?.trackEvent(event: .AdComplete,
                                                          info: nil,
                                                          metadata: nil)

        return proceedEvent(eventName)
    }
}
