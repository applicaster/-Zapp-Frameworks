//
//  GemiusAnalytics+AdEvents.swift
//  GemiusAnalytics
//
//  Created by Alex Zchut on 04/04/2021.
//  Copyright © 2021 Applicaster Ltd. All rights reserved.
//

import Foundation
import GemiusSDK
import ZappCore

extension GemiusAnalytics {
    struct AdEventParams {
        var breakSize: Int = 0
        var timeOffset: Double = 0.0
        var maxDuration: Double = 0.0
        var maxRemainingDuration: Double = 0.0
        var adPosition: Int = 0
        var id: String = ""
    }

    func shouldHandleAdEvents(for eventName: String, parameters: [String: NSObject]) -> Bool {
        var retValue = false

        switch eventName {
        case AdAnalyticsEvent.adBreakBegin:
            let currentPlayerPosition = getCurrentPlayerPosition(from: parameters)
            if let lastProgramID = lastProgramID {
                gemiusPlayerObject?.program(.BREAK,
                                            forProgram: lastProgramID,
                                            atOffset: NSNumber(value: currentPlayerPosition),
                                            with: nil)
            }

            retValue = proceedAdEvent(eventName)

        case AdAnalyticsEvent.adBegin:
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
            retValue = proceedAdEvent(eventName)

        case AdAnalyticsEvent.adEnd:
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
            retValue = proceedAdEvent(eventName)
        default:
            break
        }

        return retValue
    }

    fileprivate func proceedAdEvent(_ eventName: String) -> Bool {
        lastProceededAdEvent = eventName
        return true
    }
}
