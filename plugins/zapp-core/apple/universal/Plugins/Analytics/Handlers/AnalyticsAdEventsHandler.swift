//
//  AnalyticsAdEventsHandler.swift
//  ZappCore
//
//  Created by Alex Zchut on 09/08/2021.
//

import Foundation

open class AnalyticsAdEventsHandler: AnalyticsBaseEventsHandler, AnalyticsAdEventsHandlerProtocol {
    
    public override func handleEvent(name: String, parameters: [String: Any]?) -> Bool {
        guard super.handleEvent(name: name, parameters: parameters) == false else {
            return true
        }
        
        var retValue = false
        
        switch name {
        case AdAnalyticsEvent.adBreakBegin:
            retValue = handleAdBreakBeginEvent(name, parameters: parameters)

        case AdAnalyticsEvent.adBreakEnd:
            retValue = handleAdBreakEndEvent(name, parameters: parameters)

        case AdAnalyticsEvent.adBegin:
            retValue = handleAdBeginEvent(name, parameters: parameters)

        case AdAnalyticsEvent.adEnd:
            retValue = handleAdEndEvent(name, parameters: parameters)

        case AdAnalyticsEvent.adError:
            retValue = handleAdErrorEvent(name, parameters: parameters)
        default:
            break
        }

        return retValue
    }

    open func handleAdBreakBeginEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handleAdBreakEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handleAdBeginEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handleAdEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
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
