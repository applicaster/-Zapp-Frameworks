//
//  AnalyticsEventsHandlerProtocol.swift
//  ZappCore
//
//  Created by Alex Zchut on 09/08/2021.
//

import Foundation

public protocol AnalyticsEventsHandlerProtocol {
    func handleEvent(name: String, parameters: [String: Any]?) -> Bool
}

public protocol AnalyticsEventsHandlerDelegate: AnyObject {
    var configurationJSON: NSDictionary? {get}
}

public protocol AnalyticsPlayerEventsHandlerProtocol: AnalyticsEventsHandlerProtocol {
    func handleCreateEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleSeekingEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleSeekEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleBufferEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handlePauseEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handlePlayEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleEndedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleDismissEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
}

public protocol AnalyticsScreenEventsHandlerProtocol: AnalyticsEventsHandlerProtocol {
    func handleHomeEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleSomeScreenEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleWebPageLoadedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleTapNavbarBackButtonEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
}

public protocol AnalyticsAdEventsHandlerProtocol: AnalyticsEventsHandlerProtocol {
    func handleAdBreakBeginEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleAdBreakEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleAdBeginEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleAdEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleAdErrorEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
}
