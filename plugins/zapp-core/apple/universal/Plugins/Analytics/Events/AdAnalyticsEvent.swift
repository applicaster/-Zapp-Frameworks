//
//  AdAnalyticsEvent.swift
//  ZappCore
//
//  Created by Alex Zchut on 08/08/2021.
//

import Foundation

public struct AdAnalyticsEvent {
    public static let adBreakStart = "Player: Ad Break Start"
    public static let adBreakCompleted = "Player: Ad Break Completed"
    public static let adSkip = "Player: Ad Skip"
    public static let adStart = "Player: Ad Start"
    public static let adComplete = "Player: Ad Complete"
    public static let adError = "Player: Ad Error"
    public static let adRequest = "Player: Ad Request"
    public static let adClicked = "Player: Ad Clicked"
}

public struct AdAnalyticsEventParams {
    public var breakSize: Int = 0
    public var timeOffset: Double = 0.0
    public var maxDuration: Double = 0.0
    public var maxRemainingDuration: Double = 0.0
    public var adPosition: Int = 0
    public var id: String = ""
    
    public init(with parameters: [String: Any]?) {
        self.adPosition = parameters?["Ad Position"] as? Int ?? 0
        self.breakSize = parameters?["Ad Break Size"] as? Int ?? 0
        self.maxDuration = parameters?["Ad Break Max Duration"] as? Double ?? 0.0
        self.maxRemainingDuration = parameters?["maxRemainingDuration"] as? Double ?? 0.0
        self.timeOffset = parameters?["Ad Break Time Offset"] as? Double ?? 0.0
        self.id = parameters?["Ad Id"] as? String ?? ""
    }
}
