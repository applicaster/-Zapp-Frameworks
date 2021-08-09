//
//  AnalyticsBaseProvider+AnalyticsProviderProtocol.swift
//  ZappCore
//
//  Created by Alex Zchut on 09/08/2021.
//

import Foundation

extension AnalyticsBaseProvider: AnalyticsProviderProtocol {
    public func sendEvent(_ eventName: String,
                          parameters: [String: Any]?) {
        var parametersToPass: [String: NSObject] = [:]
        if let parameters = parameters as? [String: NSObject] {
            parametersToPass = parameters
        }
        trackEvent(eventName,
                   parameters: parametersToPass)
    }

    public func sendScreenEvent(_ screenName: String,
                                parameters: [String: Any]?) {
        var parametersToPass: [String: NSObject] = [:]
        if let parameters = parameters as? [String: NSObject] {
            parametersToPass = parameters
        }
        trackScreenView(screenName,
                        parameters: parametersToPass)
    }

    public func startObserveTimedEvent(_ eventName: String,
                                       parameters: [String: Any]?) {
        let updatedEventName = "\(eventName).start"

        var parametersToPass: [String: NSObject] = [:]
        if let parameters = parameters as? [String: NSObject] {
            parametersToPass = parameters
        }
        trackEvent(updatedEventName,
                   parameters: parametersToPass,
                   timed: true)
    }

    @objc public func stopObserveTimedEvent(_ eventName: String,
                                            parameters: [String: Any]?) {
        let updatedEventName = "\(eventName).end"

        var parametersToPass: [String: NSObject] = [:]
        if let parameters = parameters as? [String: NSObject] {
            parametersToPass = parameters
        }

        endTimedEvent(updatedEventName,
                      parameters: parametersToPass)
    }

    public func trackEvent(_ eventName: String, parameters: [String: NSObject]) {
        // Check for a valid gemius key
        guard isDisabled == false,
              let handlers = handlers else {
            return
        }

        for handler in handlers {
            if handler.handleEvent(name: eventName, parameters: parameters) {
                break
            }
        }
    }

    func trackEvent(_ eventName: String, timed: Bool) {
        trackEvent(eventName, parameters: [:], timed: timed)
    }

    func trackEvent(_ eventName: String, parameters: [String: NSObject], timed: Bool) {
        trackEvent(eventName, parameters: parameters)
    }

    func trackScreenView(_ screenName: String, parameters: [String: NSObject]) {
        trackEvent(screenName, parameters: parameters)
    }

    func endTimedEvent(_ eventName: String, parameters: [String: NSObject]) {
        trackEvent(eventName, parameters: parameters)
    }
}
