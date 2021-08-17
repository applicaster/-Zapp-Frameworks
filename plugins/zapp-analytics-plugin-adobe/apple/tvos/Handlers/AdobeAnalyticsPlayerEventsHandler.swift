//
//  AdobeAnalyticsPlayerEventsHandler.swift
//  ZappAnalyticsPluginAdobe
//
//  Created by Alex Zchut on 10/08/2021.
//  Copyright © 2021 Applicaster. All rights reserved.
//

import ACPCore
import Foundation
import ZappCore

class AdobeAnalyticsPlayerEventsHandler: AnalyticsPlayerEventsHandler {
    override open func prepareChildEventsHandlers() -> [AnalyticsBaseEventsHandler] {
        [
        ]
    }

    override func handleSessionStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleSessionStartEvent(eventName, parameters: parameters) == false else {
            return true
        }

        guard let playedMedia = playedMedia else {
            return false
        }

        let eventToPost = AdobeAnalyticsProviderEventsNames.sessionStart
        let trackParameters = getEntryBaseParameters(for: playedMedia)
        ACPCore.trackAction(eventToPost, data: trackParameters)

        return proceedEvent(eventName)
    }

    override func handleSessionEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleSessionEndEvent(eventName, parameters: parameters) == false else {
            return true
        }

        guard let playedMedia = playedMedia else {
            return false
        }

        let eventToPost = getEndEventName(for: playedMedia)
        let trackParameters = getEntryBaseParameters(for: playedMedia)
        ACPCore.trackAction(eventToPost, data: trackParameters)

        return proceedEvent(eventName)
    }

    fileprivate func getEntryBaseParameters(for playedMedia: AnalyticsPlayerMediaObject) -> [String: String] {
        var parameters: [String: String] = [:]

        parameters["Video Name"] = playedMedia.name
        parameters["External Vod ID"] = playedMedia.mediaId
        parameters["Full Video Time"] = "\(playedMedia.duration)"
        parameters["Season Name"] = playedMedia.videoProperties?.seasonName ?? ""
        parameters["Video Name"] = playedMedia.name

        return parameters
    }

    fileprivate func getEndEventName(for playedMedia: AnalyticsPlayerMediaObject) -> String {
        var retValue = AdobeAnalyticsProviderEventsNames.complete

        if playedMedia.streamType != .live,
           playedMedia.duration > 0 {
            if playedMedia.completePercentage >= 0.99 {
                // do nothing
            } else if playedMedia.completePercentage >= 0.90 {
                retValue = AdobeAnalyticsProviderEventsNames.partialComplete + "90"
            } else if playedMedia.completePercentage >= 0.75 {
                retValue = AdobeAnalyticsProviderEventsNames.partialComplete + "75"
            } else if playedMedia.completePercentage >= 0.50 {
                retValue = AdobeAnalyticsProviderEventsNames.partialComplete + "50"
            } else if playedMedia.completePercentage >= 0.25 {
                retValue = AdobeAnalyticsProviderEventsNames.partialComplete + "25"
            }
        }
        return retValue
    }
}
