//
//  AdobeAnalyticsPlayerEventsHandler.swift
//  ZappAnalyticsPluginAdobe
//
//  Created by Alex Zchut on 10/08/2021.
//

import AEPMedia
import Foundation
import ZappCore

class AdobeAnalyticsPlayerEventsHandler: AnalyticsPlayerEventsHandler {
    var tracker: MediaTracker?

    override var externalAdsHandlingObject: AnyObject? {
        return tracker
    }

    override func handleCreateEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleCreateEvent(eventName, parameters: parameters) == false else {
            return true
        }

        guard let itemData = itemData else {
            return false
        }

        tracker = Media.createTracker()

        let streamType = itemData.isLive ? MediaConstants.StreamType.LIVE : MediaConstants.StreamType.VOD
        let mediaType = MediaType.Video

        guard let mediaObject = Media.createMediaObjectWith(name: itemData.title,
                                                            id: itemData.id,
                                                            length: Double(itemData.duration),
                                                            streamType: streamType,
                                                            mediaType: mediaType) else { return false }

        let videoMetadata: [String: String] = [:]
        // Sample implementation for using video standard metadata keys
//        videoMetadata[MediaConstants.VideoMetadataKeys.SHOW] = "Sample show"
//        videoMetadata[MediaConstants.VideoMetadataKeys.SEASON] = "Sample season"

        tracker?.trackSessionStart(info: mediaObject, metadata: videoMetadata)

        return proceedEvent(eventName)
    }

    override func handleSeekingEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleSeekingEvent(eventName, parameters: parameters) == false else {
            return true
        }
        tracker?.trackEvent(event: .SeekStart, info: nil, metadata: nil)

        return proceedEvent(eventName)
    }

    override func handleSeekEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleSeekEndEvent(eventName, parameters: parameters) == false else {
            return true
        }
        tracker?.trackEvent(event: .SeekComplete, info: nil, metadata: nil)

        return proceedEvent(eventName)
    }

    override func handleBufferEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleBufferEvent(eventName, parameters: parameters) == false else {
            return true
        }
        tracker?.trackEvent(event: .BufferStart, info: nil, metadata: nil)

        return proceedEvent(eventName)
    }

    override func handlePauseEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handlePauseEvent(eventName, parameters: parameters) == false else {
            return true
        }
        tracker?.trackPause()

        return proceedEvent(eventName)
    }

    override func handlePlayEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handlePlayEvent(eventName, parameters: parameters) == false else {
            return true
        }

        if lastProceededEvent == PlayerAnalyticsEvent.buffering {
            tracker?.trackEvent(event: .BufferComplete, info: nil, metadata: nil)
        }

        tracker?.trackPlay()

        return proceedEvent(eventName)
    }

    override func handleEndedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleEndedEvent(eventName, parameters: parameters) == false else {
            return true
        }
        tracker?.trackComplete()

        return proceedEvent(eventName)
    }

    override func handleDismissEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleEndedEvent(eventName, parameters: parameters) == false else {
            return true
        }

        tracker?.trackSessionEnd()
        tracker = nil

        return proceedEvent(eventName)
    }
}
