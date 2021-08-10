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

    override func handleAdBreakBeginEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdBreakBeginEvent(eventName, parameters: parameters) == false else {
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

    override func handleAdBeginEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdBeginEvent(eventName, parameters: parameters) == false else {
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
        adIsPlaying = true
        gemiusPlayerObject?.adEvent(.PLAY,
                                    forProgram: lastProgramID,
                                    forAd: adEventParams.id,
                                    atOffset: NSNumber(value: currentPlayerPosition),
                                    with: adEventData)

        return proceedEvent(eventName)
    }

    override func handleAdEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleAdEndEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let currentPlayerPosition = getCurrentPlayerPosition(from: parameters)
        let adEventParams = AdAnalyticsEventParams(with: parameters)
        let adEventData = GSMEventAdData()
        adEventData.autoPlay = true
        adEventData.adPosition = NSNumber(value: adEventParams.adPosition)
        adEventData.breakSize = NSNumber(value: adEventParams.breakSize)
        adIsPlaying = false

        gemiusPlayerObject?.adEvent(.COMPLETE,
                                    forProgram: lastProgramID,
                                    forAd: adEventParams.id,
                                    atOffset: NSNumber(value: currentPlayerPosition),
                                    with: adEventData)
        return proceedEvent(eventName)
    }

    fileprivate func getCurrentPlayerPosition(from parameters: [String: Any]?) -> Double {
        return parameters?["offset"] as? Double ?? 0.00
    }
}
