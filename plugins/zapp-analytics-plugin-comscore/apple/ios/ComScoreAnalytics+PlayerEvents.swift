//
//  ComScoreAnalytics+PlayerEvents.swift
//  ComScoreAnalytics
//
//  Created by Alex Zchut on 08/08/2021.
//  Copyright © 2021 Applicaster Ltd. All rights reserved.
//

import ComScore
import Foundation
import ZappCore

extension ComScoreAnalytics {
    struct PlayerEventsParams {
        static let programTitle = "ns_st_pr"
        static let playlistTitle = "ns_st_pl"
        static let watchPercentage = "completion-percentage"
        static let itemId = "ns_st_ci"
        static let duration = "ns_st_cl"
        static let streamType = "ns_st_ty"
        static let baseParams = ["ns_st_pn": "1",
                                 "ns_st_tp": "1",
                                 "ns_st_ge": "*null",
                                 "ns_st_ia": "*null",
                                 "ns_st_ce": "*null",
                                 "ns_st_ddt": "*null",
                                 "ns_st_tdt": "*null"]
    }

    enum PlayerStreamType: String {
        case live
        case vod
    }

    func shouldHandlePlayerEvents(for eventName: String, parameters: [String: NSObject]) -> Bool {
        var retValue = false

        // skip same event
        guard eventName != lastProceededPlayerEvent else {
            return true
        }

        switch eventName {
        case PlayerAnalyticsEvent.created:
            retValue = handleCreateEvent(eventName, parameters: parameters)

        case PlayerAnalyticsEvent.dismissed:
            retValue = handleDismissEvent(eventName, parameters: parameters)

        case PlayerAnalyticsEvent.play, PlayerAnalyticsEvent.resume, PlayerAnalyticsEvent.seeked:
            retValue = handlePlayEvent(eventName, parameters: parameters)

        case PlayerAnalyticsEvent.paused:
            retValue = handlePauseEvent(eventName, parameters: parameters)

        case PlayerAnalyticsEvent.seeking:
            retValue = handleSeekingEvent(eventName, parameters: parameters)

        case PlayerAnalyticsEvent.seeked:
            retValue = handleSeekEndEvent(eventName, parameters: parameters)

        case PlayerAnalyticsEvent.ended:
            retValue = handleEndedEvent(eventName, parameters: parameters)

        case PlayerAnalyticsEvent.buffering:
            retValue = handleBufferEvent(eventName, parameters: parameters)

        default:
            break
        }

        return retValue
    }

    func handleCreateEvent(_ eventName: String, parameters: [String: NSObject]) -> Bool {
        guard let itemId = parameters["Item ID"] as? String,
              !itemId.isEmpty,
              lastProceededItemID != itemId else {
            return true
        }

        lastProceededItemID = itemId

        // set item title
        var itemTitle: String = ""
        if let title = parameters["Item Name"] as? String {
            itemTitle = title
        }

        // set item duration
        var itemDuration: Int = 0
        if let duration = parameters["Item Duration"] as? Int {
            itemDuration = duration
        }

        var isLive = false
        if let value = parameters["Is Live"] as? Int,
           value == 1 {
            isLive = true
        }

        var params: [String: String] = PlayerEventsParams.baseParams
        params[PlayerEventsParams.itemId] = itemId
        params[PlayerEventsParams.duration] = "\(itemDuration * 1000)"
        params[Params.publisherName] = publisherName
        params[Params.c3] = c3

        let streamType = isLive ? PlayerStreamType.live.rawValue : PlayerStreamType.vod.rawValue
        params[PlayerEventsParams.streamType] = streamType

        if isLive {
            params[PlayerEventsParams.playlistTitle] = streamType
            lastProceededItemContentType = .live
        } else {
            params[PlayerEventsParams.playlistTitle] = itemTitle
            if itemDuration >= 600 {
                lastProceededItemContentType = .longFormOnDemand
            } else {
                lastProceededItemContentType = .shortFormOnDemand
            }
        }
        lastProceededItemParams = params

        // create analytics object for new item
        streamAnalyticsForContent = SCORStreamingAnalytics()

        // crete metadata
        let cm = SCORStreamingContentMetadata { builder in
            builder?.setCustomLabels(self.lastProceededItemParams)
            builder?.setMediaType(self.lastProceededItemContentType)
        }
        // set metadata
        streamAnalyticsForContent?.setMetadata(cm)

        return proceedPlayerEvent(eventName)
    }

    func handleSeekingEvent(_ eventName: String, parameters: [String: NSObject]) -> Bool {
        guard adIsPlaying == false else {
            return true
        }

        streamAnalyticsForContent?.notifySeekStart()

        return proceedPlayerEvent(eventName)
    }

    func handleSeekEndEvent(_ eventName: String, parameters: [String: NSObject]) -> Bool {
        guard adIsPlaying == false else {
            return true
        }

        streamAnalyticsForContent?.notifyPlay()

        return proceedPlayerEvent(eventName)
    }

    func handleBufferEvent(_ eventName: String, parameters: [String: NSObject]) -> Bool {
        guard adIsPlaying == false else {
            return true
        }

        streamAnalyticsForContent?.notifyBufferStart()

        return proceedPlayerEvent(eventName)
    }

    func handlePauseEvent(_ eventName: String, parameters: [String: NSObject]) -> Bool {
        guard adIsPlaying == false else {
            return true
        }

        streamAnalyticsForContent?.notifyPause()

        return proceedPlayerEvent(eventName)
    }

    func handlePlayEvent(_ eventName: String, parameters: [String: NSObject]) -> Bool {
        guard adIsPlaying == false else {
            return true
        }

        if lastProceededPlayerEvent == PlayerAnalyticsEvent.buffering {
            streamAnalyticsForContent?.notifyBufferStop()
        }

        streamAnalyticsForContent?.notifyPlay()

        return proceedPlayerEvent(eventName)
    }

    func handleEndedEvent(_ eventName: String, parameters: [String: NSObject]) -> Bool {
        guard adIsPlaying == false else {
            return true
        }

        streamAnalyticsForContent?.notifyEnd()

        return proceedPlayerEvent(eventName)
    }

    func handleDismissEvent(_ eventName: String, parameters: [String: NSObject]) -> Bool {
        guard adIsPlaying == false else {
            return true
        }

        lastProceededPlayerEvent = nil
        lastProceededAdEvent = nil
        lastProceededPlayerEvent = nil
        lastProceededScreenEvent = nil
        streamAnalyticsForContent = nil
        streamAnalyticsForAds = nil
        return true
    }

    fileprivate func proceedPlayerEvent(_ eventName: String) -> Bool {
        lastProceededPlayerEvent = eventName
        return true
    }
}
