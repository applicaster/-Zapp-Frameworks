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

    open override func prepareChildEventsHandlers() -> [AnalyticsBaseEventsHandler] {
        [
            AdobeAnalyticsAdEventsHandler(delegate: self)
        ]
    }
    
    override func handleSessionStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleSessionStartEvent(eventName, parameters: parameters) == false else {
            return true
        }

        guard let playedMedia = playedMedia else {
            return false
        }

        tracker = Media.createTracker()

        let streamType = playedMedia.streamType == .live ? MediaConstants.StreamType.LIVE : MediaConstants.StreamType.VOD
        let mediaType = MediaType.Video

        guard let mediaObject = Media.createMediaObjectWith(name: playedMedia.name,
                                                            id: playedMedia.mediaId,
                                                            length: Double(playedMedia.duration),
                                                            streamType: streamType,
                                                            mediaType: mediaType) else { return false }

        var metadata: [String: String] = [:]
        if let videoProperties = playedMedia.videoProperties {
            metadata[MediaConstants.VideoMetadataKeys.SHOW] = videoProperties.showName
            metadata[MediaConstants.VideoMetadataKeys.GENRE] = videoProperties.genre
            metadata[MediaConstants.VideoMetadataKeys.NETWORK] = videoProperties.network
            metadata[MediaConstants.VideoMetadataKeys.RATING] = videoProperties.rating
            metadata[MediaConstants.VideoMetadataKeys.SEASON] = videoProperties.seasonName
            metadata[MediaConstants.VideoMetadataKeys.SHOW_TYPE] = videoProperties.showType
            metadata[MediaConstants.VideoMetadataKeys.STREAM_FORMAT] = videoProperties.streamFormat
        }
        else if let audioProperties = playedMedia.audioProperties {
            metadata[MediaConstants.AudioMetadataKeys.ALBUM] = audioProperties.album
            metadata[MediaConstants.AudioMetadataKeys.ARTIST] = audioProperties.artist
            metadata[MediaConstants.AudioMetadataKeys.AUTHOR] = audioProperties.author
            metadata[MediaConstants.AudioMetadataKeys.LABEL] = audioProperties.label
            metadata[MediaConstants.AudioMetadataKeys.PUBLISHER] = audioProperties.publisher
            metadata[MediaConstants.AudioMetadataKeys.STATION] = audioProperties.station
        }
        tracker?.trackSessionStart(info: mediaObject, metadata: metadata)

        return proceedEvent(eventName)
    }

    override func handleSeekStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleSeekStartEvent(eventName, parameters: parameters) == false else {
            return true
        }
        tracker?.trackEvent(event: .SeekStart, info: nil, metadata: nil)

        return proceedEvent(eventName)
    }

    override func handleSeekCompleteEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleSeekCompleteEvent(eventName, parameters: parameters) == false else {
            return true
        }
        tracker?.trackEvent(event: .SeekComplete, info: nil, metadata: nil)

        return proceedEvent(eventName)
    }

    override func handleBufferStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleBufferStartEvent(eventName, parameters: parameters) == false else {
            return true
        }
        tracker?.trackEvent(event: .BufferStart, info: nil, metadata: nil)

        return proceedEvent(eventName)
    }
    
    override func handleBufferCompleteEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleBufferCompleteEvent(eventName, parameters: parameters) == false else {
            return true
        }
        tracker?.trackEvent(event: .BufferComplete, info: nil, metadata: nil)

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

        tracker?.trackPlay()

        return proceedEvent(eventName)
    }

    override func handleSessionEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handleSessionEndEvent(eventName, parameters: parameters) == false else {
            return true
        }
        tracker?.trackComplete()

        return proceedEvent(eventName)
    }

    override func handlePlayerClosedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard super.handlePlayerClosedEvent(eventName, parameters: parameters) == false else {
            return true
        }

        tracker?.trackSessionEnd()
        tracker = nil

        return proceedEvent(eventName)
    }
}

extension AdobeAnalyticsPlayerEventsHandler: AnalyticsEventsHandlerDelegate {
    public var configurationJSON: NSDictionary? {
        return nil
    }

    public var externalObject: AnyObject? {
        get {
            return tracker
        }
        set {
            
        }
    }
}
