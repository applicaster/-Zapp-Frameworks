//
//  ComScoreAnalyticsAdEventsHandler.swift
//  ZappAnalyticsPluginComScore
//
//  Created by Alex Zchut on 10/08/2021.
//

import Foundation
import ZappCore
import ComScore

class ComScoreAnalyticsAdEventsHandler: AnalyticsAdEventsHandler {
    var streamAnalyticsForAds: SCORStreamingAnalytics?

    override func handleAdBeginEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleAdBeginEvent(eventName, parameters: parameters) == false else {
            return true
        }
        
        let adEventParams = AdAnalyticsEventParams(with: parameters)
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
        
        return proceedEvent(eventName)
    }
    
    override func handleAdEndEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleAdBeginEvent(eventName, parameters: parameters) == false else {
            return true
        }
        streamAnalyticsForAds?.notifyEnd()
        return proceedEvent(eventName)
    }
}
