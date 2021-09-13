//
//  AnalyticsPlayerEventsHandler.swift
//  ZappCore
//
//  Created by Alex Zchut on 09/08/2021.
//

import Foundation

open class AnalyticsPlayerEventsHandler: AnalyticsBaseEventsHandler, AnalyticsPlayerEventsHandlerProtocol, AnalyticsEventsHandlerDelegate {
    public var playedMedia: AnalyticsPlayerMediaObject?
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
        case PlayerAnalyticsEvent.playerPresented:
            retValue = handlePlayerPresentedEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.playerClosed:
            retValue = handlePlayerClosedEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.play:
            retValue = handlePlayEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.pause:
            retValue = handlePauseEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.seekStart:
            retValue = handleSeekStartEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.seekComplete:
            retValue = handleSeekCompleteEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.sessionStart:
            retValue = handleSessionStartEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.sessionEnd:
            retValue = handleSessionEndEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.bufferStart:
            retValue = handleBufferStartEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.bufferComplete:
            retValue = handleBufferCompleteEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.complete:
            retValue = handlePlaybackCompleteEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.error:
            retValue = handlePlaybackErrorEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.stop:
            retValue = handlePlaybackStopEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.next:
            retValue = handlePlayNextEvent(name, parameters: parameters)

        case PlayerAnalyticsEvent.previous:
            retValue = handlePlayPreviousEvent(name, parameters: parameters)

        default:
            break
        }

        return retValue
    }

    open func handlePlayerPresentedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        playedMedia = AnalyticsPlayerMediaObject(parameters: parameters)
        return false
    }

    open func handlePlayerClosedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }

        lastProceededEvent = nil
        playedMedia = nil

        return false
    }

    open func handlePlayEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }
        playedMedia = AnalyticsPlayerMediaObject(parameters: parameters)

        return false
    }

    open func handlePauseEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }
        playedMedia = AnalyticsPlayerMediaObject(parameters: parameters)

        return false
    }

    open func handleSeekStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }
        playedMedia = AnalyticsPlayerMediaObject(parameters: parameters)

        return false
    }

    open func handleSeekCompleteEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }
        playedMedia = AnalyticsPlayerMediaObject(parameters: parameters)

        return false
    }

    open func handleSessionStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }
        playedMedia = AnalyticsPlayerMediaObject(parameters: parameters)

        return false
    }

    open func handleSessionEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }
        playedMedia = AnalyticsPlayerMediaObject(parameters: parameters)

        return false
    }

    open func handleBufferStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }
        playedMedia = AnalyticsPlayerMediaObject(parameters: parameters)

        return false
    }

    open func handleBufferCompleteEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        guard !isBlockedByChildHandler else {
            return true
        }
        playedMedia = AnalyticsPlayerMediaObject(parameters: parameters)

        return false
    }

    open func handlePlaybackCompleteEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        playedMedia = AnalyticsPlayerMediaObject(parameters: parameters)
        return false
    }

    open func handlePlaybackErrorEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        playedMedia = AnalyticsPlayerMediaObject(parameters: parameters)
        return false
    }

    open func handlePlaybackStopEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        playedMedia = AnalyticsPlayerMediaObject(parameters: parameters)
        return false
    }

    open func handlePlayNextEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handlePlayPreviousEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    // MARK: - AnalyticsEventsHandlerDelegate

    open var isCompleteReported: Bool {
        get {
            return delegate?.isCompleteReported ?? false
        }
        set(newValue) {
            delegate?.isCompleteReported = newValue
        }
    }

    open var configurationJSON: NSDictionary? {
        return delegate?.configurationJSON
    }

    open var externalObject: AnyObject? {
        get {
            return delegate?.externalObject
        }
        set {
        }
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
