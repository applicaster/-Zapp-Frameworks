//
//  AnalyticsPlayerEventsHandler.swift
//  ZappCore
//
//  Created by Alex Zchut on 09/08/2021.
//

import Foundation

public struct AnalyticsPlayerObject {
    public var id: String
    public let title: String
    public let duration: Int
    public let isLive: Bool
}

open class AnalyticsPlayerEventsHandler: NSObject, AnalyticsPlayerEventsHandlerProtocol {
    public weak var delegate:AnalyticsEventsHandlerDelegate?
    
    public var lastProceededEvent: String?
    public var itemData: AnalyticsPlayerObject?
    public var itemIntialParameters: [String: Any]?

    var adEventsHandler: AnalyticsAdEventsHandler?
    
    public init(delegate: AnalyticsEventsHandlerDelegate?, adEventsHandler: AnalyticsAdEventsHandler?) {
        super.init()
        self.delegate = delegate
        self.adEventsHandler = adEventsHandler
    }
    
    open func handleEvent(name: String, parameters: [String: Any]?) -> Bool {
        var retValue = false

        // skip same event
        guard name != lastProceededEvent else {
            return true
        }
        
        guard adEventsHandler?.handleEvent(name: name, parameters: parameters) == false else {
            return true
        }

        switch name {
        case PlayerAnalyticsEvent.initial:
            retValue = handleInitialEvent(name, parameters: parameters)
            
        case PlayerAnalyticsEvent.created:
            retValue = handleCreateEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.dismissed:
            retValue = handleDismissEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.play, PlayerAnalyticsEvent.resume, PlayerAnalyticsEvent.seeked:
            retValue = handlePlayEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.paused:
            retValue = handlePauseEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.seeking:
            retValue = handleSeekingEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.seeked:
            retValue = handleSeekEndEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.ended:
            retValue = handleEndedEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.buffering:
            retValue = handleBufferEvent(name, parameters: parameters)

        default:
            break
        }

        return retValue
    }

    func handleInitialEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        itemIntialParameters = parameters
        return true
    }
    
    open func handleCreateEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard let itemId = parameters?["Item ID"] as? String,
              !itemId.isEmpty,
              itemData?.id != itemId else {
            return true
        }

        // set item title
        var itemTitle: String = ""
        if let title = parameters?["Item Name"] as? String {
            itemTitle = title
        }

        // set item duration
        var itemDuration: Int = 0
        if let duration = parameters?["Item Duration"] as? Int {
            itemDuration = duration
        }

        var isLive = false
        if let value = parameters?["Is Live"] as? Int,
           value == 1 {
            isLive = true
        }

        itemData = AnalyticsPlayerObject(id: itemId,
                                         title: itemTitle,
                                         duration: itemDuration,
                                         isLive: isLive)
        return false
    }

    open func handleSeekingEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard adEventsHandler?.adIsPlaying == false else {
            return true
        }

        return false
    }

    open func handleSeekEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard adEventsHandler?.adIsPlaying == false else {
            return true
        }

        return false
    }

    open func handleBufferEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard adEventsHandler?.adIsPlaying == false else {
            return true
        }

        return false
    }

    open func handlePauseEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard adEventsHandler?.adIsPlaying == false else {
            return true
        }

        return false
    }

    open func handlePlayEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard adEventsHandler?.adIsPlaying == false else {
            return true
        }

        return false
    }

    open func handleEndedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard adEventsHandler?.adIsPlaying == false else {
            return true
        }

        return false
    }

    open func handleDismissEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard adEventsHandler?.adIsPlaying == false else {
            return true
        }

        lastProceededEvent = nil
        itemIntialParameters = nil
        itemData = nil
        adEventsHandler?.lastProceededEvent = nil
        
        return false
    }

    public func proceedEvent(_ eventName: String) -> Bool {
        lastProceededEvent = eventName
        return true
    }
}
