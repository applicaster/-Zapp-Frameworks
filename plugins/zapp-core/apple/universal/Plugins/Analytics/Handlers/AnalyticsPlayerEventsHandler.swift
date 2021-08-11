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

open class AnalyticsPlayerEventsHandler: AnalyticsBaseEventsHandler, AnalyticsPlayerEventsHandlerProtocol {
    public var itemData: AnalyticsPlayerObject?
    public var itemIntialParameters: [String: Any]?
    var childHandlers: [AnalyticsBaseEventsHandler]?

    override public init(delegate: AnalyticsEventsHandlerDelegate?) {
        super.init(delegate: delegate)
        childHandlers = prepareChildEventsHandlers()
    }

    open func prepareChildEventsHandlers() -> [AnalyticsBaseEventsHandler] {
        fatalError("Must override this method to create child events handlers for this handler")
    }

    override public func handleEvent(name: String, parameters: [String: Any]?) -> Bool {
        guard super.handleEvent(name: name, parameters: parameters) == false else {
            return true
        }

        var retValue = false

        // try handle event by child handlers
        guard handleEventByChildHandlers(name: name, parameters: parameters) == false else {
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
        guard !isBlockedByChildHandler else {
            return true
        }

        return false
    }

    open func handleSeekEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }

        return false
    }

    open func handleBufferEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }

        return false
    }

    open func handlePauseEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }

        return false
    }

    open func handlePlayEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }

        return false
    }

    open func handleEndedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }

        return false
    }

    open func handleDismissEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }

        lastProceededEvent = nil
        itemIntialParameters = nil
        itemData = nil

        return false
    }
}

extension AnalyticsPlayerEventsHandler {
    fileprivate func getChildHandlers() -> [AnalyticsBaseEventsHandler] {
        return childHandlers ?? []
    }

    fileprivate func handleEventByChildHandlers(name: String, parameters: [String: Any]?) -> Bool {
        var retValue = false
        for handler in getChildHandlers() {
            if handler.handleEvent(name: name, parameters: parameters) {
                retValue = true
                break
            }
        }
        return retValue
    }
    
    var isBlockedByChildHandler: Bool {
        return getChildHandlers().filter(\.shouldBlockParentHandler).count > 0
    }
}
