//
//  AnalyticsAdEventsHandler.swift
//  ZappCore
//
//  Created by Alex Zchut on 09/08/2021.
//

import Foundation

open class AnalyticsAdEventsHandler: NSObject, AnalyticsAdEventsHandlerProtocol {
    weak var delegate:AnalyticsEventsHandlerDelegate?

    var lastProceededEvent: String?
    var adIsPlaying: Bool = false
    
    public init(delegate: AnalyticsEventsHandlerDelegate?) {
        super.init()
        self.delegate = delegate
    }
    
    public func handleEvent(name: String, parameters: [String: Any]?) -> Bool {
        var retValue = false

        // skip same event
        guard name != lastProceededEvent else {
            return true
        }

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

    public func proceedEvent(_ eventName: String) -> Bool {
        lastProceededEvent = eventName
        return true
    }
}
