//
//  ComScoreAnalyticsPlayerEventsHandler.swift
//  ZappAnalyticsPluginComScore
//
//  Created by Alex Zchut on 10/08/2021.
//

import ComScore
import Foundation
import ZappCore

class ComScoreAnalyticsPlayerEventsHandler: AnalyticsPlayerEventsHandler {
    var streamAnalyticsForContent: SCORStreamingAnalytics?
    var lastProceededItemContentType: SCORStreamingContentType = .other
    var lastProceededItemParams: [String: String]?

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

    public lazy var publisherName: String = {
        delegate?.configurationJSON?[ComScoreAnalyticsProviderParams.publisherName] as? String ?? ""
    }()

    public lazy var c3: String = {
        delegate?.configurationJSON?[ComScoreAnalyticsProviderParams.c3] as? String ?? ""
    }()

    override func handleCreateEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleCreateEvent(eventName, parameters: parameters) == false else {
            return true
        }

        guard let itemData = itemData else {
            return false
        }

        var params: [String: String] = PlayerEventsParams.baseParams
        params[PlayerEventsParams.itemId] = itemData.id
        params[PlayerEventsParams.duration] = "\(itemData.duration * 1000)"
        params[ComScoreAnalyticsProviderParams.publisherName] = publisherName
        params[ComScoreAnalyticsProviderParams.c3] = c3

        let streamType = itemData.isLive ? PlayerStreamType.live.rawValue : PlayerStreamType.vod.rawValue
        params[PlayerEventsParams.streamType] = streamType

        if itemData.isLive {
            params[PlayerEventsParams.playlistTitle] = streamType
            lastProceededItemContentType = .live
        } else {
            params[PlayerEventsParams.playlistTitle] = itemData.title
            if itemData.duration >= 600 {
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

        return proceedEvent(eventName)
    }
    
    override func handleSeekingEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleSeekingEvent(eventName, parameters: parameters) == false else {
            return true
        }
        streamAnalyticsForContent?.notifySeekStart()
        
        return proceedEvent(eventName)
    }
    
    override func handleSeekEndEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleSeekEndEvent(eventName, parameters: parameters) == false else {
            return true
        }
        streamAnalyticsForContent?.notifyPlay()
        
        return proceedEvent(eventName)
    }
    
    override func handleBufferEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleBufferEvent(eventName, parameters: parameters) == false else {
            return true
        }
        streamAnalyticsForContent?.notifyBufferStart()
        
        return proceedEvent(eventName)
    }
    
    override func handlePauseEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handlePauseEvent(eventName, parameters: parameters) == false else {
            return true
        }
        streamAnalyticsForContent?.notifyPause()
        
        return proceedEvent(eventName)
    }

    override func handlePlayEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handlePlayEvent(eventName, parameters: parameters) == false else {
            return true
        }
        
        if lastProceededEvent == PlayerAnalyticsEvent.buffering {
            streamAnalyticsForContent?.notifyBufferStop()
        }

        streamAnalyticsForContent?.notifyPlay()
        
        return proceedEvent(eventName)
    }
    
    override func handleEndedEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleEndedEvent(eventName, parameters: parameters) == false else {
            return true
        }
        streamAnalyticsForContent?.notifyEnd()

        return proceedEvent(eventName)
    }

    override func handleDismissEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleEndedEvent(eventName, parameters: parameters) == false else {
            return true
        }
        
        streamAnalyticsForContent = nil
        
        return proceedEvent(eventName)
    }
}
