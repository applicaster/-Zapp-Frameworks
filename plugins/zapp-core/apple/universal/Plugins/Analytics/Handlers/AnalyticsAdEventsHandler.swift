//
//  AnalyticsAdEventsHandler.swift
//  ZappCore
//
//  Created by Alex Zchut on 09/08/2021.
//

import Foundation

open class AnalyticsAdEventsHandler: AnalyticsBaseEventsHandler, AnalyticsAdEventsHandlerProtocol {
    public var adBreakCounter: Int = 0
    override public func handleEvent(name: String, parameters: [String: Any]?) -> Bool {
        guard super.handleEvent(name: name, parameters: parameters) == false else {
            return true
        }

        var retValue = false

        switch name {
        case AdAnalyticsEvent.adBreakStart:
            retValue = handleAdBreakStartEvent(name, parameters: parameters)

        case AdAnalyticsEvent.adBreakCompleted:
            retValue = handleAdBreakCompletedEvent(name, parameters: parameters)

        case AdAnalyticsEvent.adStart:
            retValue = handleAdStartEvent(name, parameters: parameters)

        case AdAnalyticsEvent.adComplete:
            retValue = handleAdCompleteEvent(name, parameters: parameters)

        case AdAnalyticsEvent.adError:
            retValue = handleAdErrorEvent(name, parameters: parameters)

        case AdAnalyticsEvent.adClicked:
            retValue = handleAdClickedEvent(name, parameters: parameters)

        case AdAnalyticsEvent.adSkip:
            retValue = handleAdSkipEvent(name, parameters: parameters)

        case AdAnalyticsEvent.adRequest:
            retValue = handleAdRequestEvent(name, parameters: parameters)
        default:
            break
        }

        return retValue
    }

    open func handleAdBreakStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        adBreakCounter += 1
        return false
    }

    open func handleAdBreakCompletedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handleAdStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handleAdCompleteEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handleAdErrorEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handleAdClickedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handleAdSkipEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handleAdRequestEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }
}

extension AnalyticsAdEventsHandler {
    public func getCurrentPlayerPosition(from parameters: [String: Any]?) -> Double {
        return parameters?["Item Position"] as? Double ?? 0.00
    }

    public func getCurrentItemDuration(from parameters: [String: Any]?) -> Double {
        let key = "Item Duration"
        var value: Double = 0
        if let duration = parameters?[key] as? String {
            value = Double(duration) ?? 0.00
        } else if let duration = parameters?[key] as? Double {
            value = duration
        }
        return value
    }

    public func isEndOfPlayback(accordingTo parameters: [String: Any]?) -> Bool {
        let position = getCurrentPlayerPosition(from: parameters)
        let duration = getCurrentItemDuration(from: parameters)
        return position >= duration
    }
}
