//
//  ComScoreAnalytics+AdEvents.swift
//  ComScoreAnalytics
//
//  Created by Alex Zchut on 21/06/2021.
//  Copyright © 2021 Applicaster Ltd. All rights reserved.
//

import Foundation
import ZappCore

extension ComScoreAnalytics {
    func shouldHandleScreenEvents(for eventName: String, parameters: [String: NSObject]) -> Bool {
        var retValue = false

        if eventName.contains(ScreenAnalyticsEvent.home) {
            let params = ["Screen": "Home"]

            retValue = proceedScreenEvent(eventName,
                                          params: params)

        } else if eventName.contains(ScreenAnalyticsEvent.someScreen) {
            let params = ["Screen": eventName]

            retValue = proceedScreenEvent(eventName,
                                          params: params)

        } else if eventName.contains(ScreenAnalyticsEvent.webPageLoaded) {
            guard let url = parameters[ScreenAnalyticsEventParams.url] as? String else {
                return false
            }

            let params = ["Type": eventName,
                          "url": url]

            retValue = proceedScreenEvent(eventName,
                                          params: params)

        } else if eventName == ScreenAnalyticsEvent.tapNavbarBackButton {
            var params = ["Type": eventName]
            if let trigger = parameters[ScreenAnalyticsEventParams.trigger] as? String {
                params["Source"] = trigger
            }

            retValue = proceedScreenEvent(eventName,
                                          params: params)
        }

        return retValue
    }

    fileprivate func proceedScreenEvent(_ eventName: String, type: String = "", params: [String: String]) -> Bool {

        lastProceededScreenEvent = eventName
        return true
    }
}
