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

    open override func prepareChildEventsHandlers() -> [AnalyticsBaseEventsHandler] {
        []
    }
    
    override func handlePlayerPresentedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handlePlayerPresentedEvent(eventName, parameters: parameters) == false else {
            return true
        }

        guard let playedMedia = playedMedia else {
            return false
        }

        var params: [String: String] = PlayerEventsParams.baseParams
        params[PlayerEventsParams.itemId] = playedMedia.mediaId
        params[PlayerEventsParams.duration] = "\(playedMedia.duration * 1000)"
        params[ComScoreAnalyticsProviderParams.publisherName] = publisherName
        params[ComScoreAnalyticsProviderParams.c3] = c3

        let isLive = playedMedia.streamType == .live
        
        let streamType = isLive ? PlayerStreamType.live.rawValue : PlayerStreamType.vod.rawValue
        params[PlayerEventsParams.streamType] = streamType

        var contentType: SCORStreamingContentType = .other
        if isLive {
            params[PlayerEventsParams.playlistTitle] = streamType
            contentType = .live
        } else {
            params[PlayerEventsParams.playlistTitle] = playedMedia.name
            if playedMedia.duration >= 600 {
                contentType = .longFormOnDemand
            } else {
                contentType = .shortFormOnDemand
            }
        }

        // create analytics object for new item
        streamAnalyticsForContent = SCORStreamingAnalytics()

        // crete metadata
        let cm = SCORStreamingContentMetadata { builder in
            builder?.setCustomLabels(params)
            builder?.setMediaType(contentType)
        }
        // set metadata
        streamAnalyticsForContent?.setMetadata(cm)

        return proceedEvent(eventName)
    }
    
    override func handleSeekStartEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleSeekStartEvent(eventName, parameters: parameters) == false else {
            return true
        }
        streamAnalyticsForContent?.notifySeekStart()
        
        return proceedEvent(eventName)
    }
    
    override func handleSeekCompleteEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleSeekCompleteEvent(eventName, parameters: parameters) == false else {
            return true
        }
        streamAnalyticsForContent?.notifyPlay()
        
        return proceedEvent(eventName)
    }
    
    override func handleBufferStartEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleBufferStartEvent(eventName, parameters: parameters) == false else {
            return true
        }
        streamAnalyticsForContent?.notifyBufferStart()
        
        return proceedEvent(eventName)
    }
    
    override func handleBufferCompleteEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleBufferCompleteEvent(eventName, parameters: parameters) == false else {
            return true
        }
        streamAnalyticsForContent?.notifyBufferStop()
        
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
        
        streamAnalyticsForContent?.notifyPlay()
        
        return proceedEvent(eventName)
    }
    
    override func handlePlaybackCompleteEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handlePlaybackCompleteEvent(eventName, parameters: parameters) == false else {
            return true
        }
        streamAnalyticsForContent?.notifyEnd()

        return proceedEvent(eventName)
    }

    override func handlePlayerClosedEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handlePlayerClosedEvent(eventName, parameters: parameters) == false else {
            return true
        }
        
        streamAnalyticsForContent = nil
        
        return proceedEvent(eventName)
    }
}
