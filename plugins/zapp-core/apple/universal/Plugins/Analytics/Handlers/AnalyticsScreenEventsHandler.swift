//
//  AnalyticsScreenEventsHandler.swift
//  ZappCore
//
//  Created by Alex Zchut on 09/08/2021.
//

import Foundation

open class AnalyticsScreenEventsHandler: NSObject, AnalyticsScreenEventsHandlerProtocol {
    public weak var delegate:AnalyticsEventsHandlerDelegate?
    
    var lastProceededEvent: String?

    public init(delegate: AnalyticsEventsHandlerDelegate?) {
        super.init()
        self.delegate = delegate
    }
    
    open func handleEvent(name: String, parameters: [String: Any]?) -> Bool {
        var retValue = false

        // skip same event
        guard name != lastProceededEvent else {
            return true
        }

        if name.contains(ScreenAnalyticsEvent.home) {
            let params = ["Screen": "Home"]
            retValue = handleHomeEvent(name, parameters: params)

        } else if name.contains(ScreenAnalyticsEvent.someScreen) {
            let params = ["Screen": name]
            retValue = handleSomeScreenEvent(name, parameters: params)

        } else if name.contains(ScreenAnalyticsEvent.webPageLoaded) {
            guard let url = parameters?[ScreenAnalyticsEventParams.url] as? String else {
                return false
            }

            let params = ["Type": name,
                          "url": url]

            retValue = handleWebPageLoadedEvent(name,
                                                parameters: params)

        } else if name == ScreenAnalyticsEvent.tapNavbarBackButton {
            var params = ["Type": name]
            if let trigger = parameters?[ScreenAnalyticsEventParams.trigger] as? String {
                params["Source"] = trigger
            }

            retValue = handleTapNavbarBackButtonEvent(name,
                                                      parameters: params)
        }

        return retValue
    }

    open func handleHomeEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handleSomeScreenEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handleWebPageLoadedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    open func handleTapNavbarBackButtonEvent(_ eventName: String, parameters: [String: Any]?) -> Bool {
        return false
    }

    public func proceedEvent(_ eventName: String) -> Bool {
        lastProceededEvent = eventName
        return true
    }
}
