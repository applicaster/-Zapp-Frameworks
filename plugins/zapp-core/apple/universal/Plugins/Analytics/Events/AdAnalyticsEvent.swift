//
//  AdAnalyticsEvent.swift
//  ZappCore
//
//  Created by Alex Zchut on 08/08/2021.
//

import Foundation

public struct AdAnalyticsEvent {
    public static let adBreakBegin = "Ad Break Begin"
    public static let adBreakEnd = "Ad Break End"
    public static let adError = "Ad Error"
    public static let adBegin = "Ad Begin"
    public static let adEnd = "Ad End"
}

public struct AdAnalyticsEventParams {
    public var breakSize: Int = 0
    public var timeOffset: Double = 0.0
    public var maxDuration: Double = 0.0
    public var maxRemainingDuration: Double = 0.0
    public var adPosition: Int = 0
    public var id: String = ""
    
    public init() {
        
    }
}
