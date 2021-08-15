//
//  GemiusAnalyticsAdEventsHandler.swift
//  ZappAnalyticsPluginGemius
//
//  Created by Alex Zchut on 10/08/2021.
//

import Foundation
import GemiusSDK
import ZappCore

class GemiusAnalyticsAdEventsHandler: AnalyticsAdEventsHandler {
    var gemiusPlayerObject: GSMPlayer? {
        return delegate?.externalObject as? GSMPlayer
    }

    var lastProgramID: String?

    override func handleAdBreakStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdBreakStartEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let currentPlayerPosition = getCurrentPlayerPosition(from: parameters)
        if let lastProgramID = lastProgramID {
            gemiusPlayerObject?.program(.BREAK,
                                        forProgram: lastProgramID,
                                        atOffset: NSNumber(value: currentPlayerPosition),
                                        with: nil)
        }

        return proceedEvent(eventName)
    }

    override func handleAdStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdStartEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let currentPlayerPosition = getCurrentPlayerPosition(from: parameters)
        let data = GSMAdData()
        let adEventParams = AdAnalyticsEventParams(with: parameters)
        let adEventData = GSMEventAdData()

        gemiusPlayerObject?.newAd(adEventParams.id,
                                  with: data)

        adEventData.autoPlay = true
        adEventData.adPosition = NSNumber(value: adEventParams.adPosition)
        adEventData.breakSize = NSNumber(value: adEventParams.breakSize)
        shouldBlockParentHandler = true
        gemiusPlayerObject?.adEvent(.PLAY,
                                    forProgram: lastProgramID,
                                    forAd: adEventParams.id,
                                    atOffset: NSNumber(value: currentPlayerPosition),
                                    with: adEventData)

        return proceedEvent(eventName)
    }

    override func handleAdCompleteEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdCompleteEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let currentPlayerPosition = getCurrentPlayerPosition(from: parameters)
        let adEventParams = AdAnalyticsEventParams(with: parameters)
        let adEventData = GSMEventAdData()
        adEventData.autoPlay = true
        adEventData.adPosition = NSNumber(value: adEventParams.adPosition)
        adEventData.breakSize = NSNumber(value: adEventParams.breakSize)
        shouldBlockParentHandler = false

        gemiusPlayerObject?.adEvent(.COMPLETE,
                                    forProgram: lastProgramID,
                                    forAd: adEventParams.id,
                                    atOffset: NSNumber(value: currentPlayerPosition),
                                    with: adEventData)
        return proceedEvent(eventName)
    }
}
