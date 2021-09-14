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
    var configurationJSON: NSDictionary? { get }
    var externalObject: AnyObject? { get set }

    var isCompleteReported: Bool { get set }
}

public protocol AnalyticsPlayerEventsHandlerProtocol: AnalyticsEventsHandlerProtocol {
    func handlePlayerPresentedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handlePlayerClosedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handlePlayEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handlePauseEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleSeekStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleSeekCompleteEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleSessionStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleSessionEndEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleBufferStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleBufferCompleteEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handlePlaybackCompleteEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handlePlaybackErrorEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handlePlaybackStopEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handlePlayNextEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handlePlayPreviousEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
}

public protocol AnalyticsScreenEventsHandlerProtocol: AnalyticsEventsHandlerProtocol {
    func handleHomeEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleSomeScreenEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleWebPageLoadedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleTapNavbarBackButtonEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
}

public protocol AnalyticsAdEventsHandlerProtocol: AnalyticsEventsHandlerProtocol {
    func handleAdBreakStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleAdBreakCompletedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleAdStartEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleAdCompleteEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleAdErrorEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleAdClickedEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleAdSkipEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
    func handleAdRequestEvent(_ eventName: String, parameters: [String: Any]?) -> Bool
}
