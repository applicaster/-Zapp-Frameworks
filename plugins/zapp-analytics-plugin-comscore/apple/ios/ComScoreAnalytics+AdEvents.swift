//
//  ComScoreAnalytics+AdEvents.swift
//  ComScoreAnalytics
//
//  Created by Alex Zchut on 08/08/2021.
//  Copyright © 2021 Applicaster Ltd. All rights reserved.
//

import Foundation
import ZappCore
import ComScore

extension ComScoreAnalytics {
    func shouldHandleAdEvents(for eventName: String, parameters: [String: NSObject]) -> Bool {
        var retValue = false

        switch eventName {
        case AdAnalyticsEvent.adBegin:
            let adEventParams = parseAdEventParams(from: parameters)
            streamAnalyticsForAds = SCORStreamingAnalytics()
            let metadata = ["ns_st_cl": "0"]
            let am = SCORStreamingAdvertisementMetadata { builder in
                builder?.setCustomLabels(metadata)
                if adEventParams.adPosition == 0 {
                    builder?.setMediaType(.onDemandPreRoll)
                }
                else {
                    builder?.setMediaType(.onDemandMidRoll)
                }
            }
            streamAnalyticsForAds?.setMetadata(am)
            streamAnalyticsForAds?.notifyPlay()

            retValue = proceedAdEvent(eventName)

        case AdAnalyticsEvent.adEnd:
            streamAnalyticsForAds?.notifyEnd()
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

    fileprivate func parseAdEventParams(from parameters: [String: NSObject]) -> AdAnalyticsEventParams {
        var adParams = AdAnalyticsEventParams()

        adParams.adPosition = parameters["Ad Position"] as? Int ?? 0
        adParams.breakSize = parameters["Ad Break Size"] as? Int ?? 0
        adParams.maxDuration = parameters["Ad Break Max Duration"] as? Double ?? 0.0
        adParams.maxRemainingDuration = parameters["maxRemainingDuration"] as? Double ?? 0.0
        adParams.timeOffset = parameters["Ad Break Time Offset"] as? Double ?? 0.0
        adParams.id = parameters["Ad Id"] as? String ?? ""

        return adParams
    }
}
