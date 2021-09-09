//
//  AnalyticsAdEventsHandler.swift
//  ZappCore
//
//  Created by Alex Zchut on 09/08/2021.
//

import Foundation

open class AnalyticsAdEventsHandler: AnalyticsBaseEventsHandler, AnalyticsAdEventsHandlerProtocol {
    public var adBreakCounter: Int = 0
    public override func handleEvent(name: String, parameters: [String: Any]?) -> Bool {
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
        default:
            break
        }

        return retValue
    }

    open func handleAdBreakStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        adBreakCounter+=1
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
}

extension AnalyticsAdEventsHandler {
    public func getCurrentPlayerPosition(from parameters: [String: Any]?) -> Double {
        return parameters?["offset"] as? Double ?? 0.00
    }
}
