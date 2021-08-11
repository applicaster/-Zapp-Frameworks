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
    override func handleAdBreakBeginEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdBreakBeginEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let adBreakObject = Media.createAdBreakObjectWith(name: "adbreak-name",
                                                          position: 1,
                                                          startTime: 0)

        let videoMetadata: [String: String] = [:]

        delegate?.externalObject?.trackEvent(event: .AdBreakStart, info: adBreakObject, metadata: videoMetadata)

        return proceedEvent(eventName)
    }

    override func handleAdBreakEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdBreakEndEvent(eventName, parameters: parameters) == false else {
            return true
        }

        delegate?.externalObject?.trackEvent(event: .AdBreakComplete,
                                                          info: nil,
                                                          metadata: nil)

        return proceedEvent(eventName)
    }

    override func handleAdBeginEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdBeginEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let adObject = Media.createAdObjectWith(name: "ad-name",
                                                id: UUID().uuidString,
                                                position: 1,
                                                length: 0)

        let videoMetadata: [String: String] = [:]

        delegate?.externalObject?.trackEvent(event: .AdStart,
                                                          info: adObject,
                                                          metadata: videoMetadata)

        return proceedEvent(eventName)
    }

    override func handleAdEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdEndEvent(eventName, parameters: parameters) == false else {
            return true
        }

        delegate?.externalObject?.trackEvent(event: .AdComplete,
                                                          info: nil,
                                                          metadata: nil)

        return proceedEvent(eventName)
    }
}
