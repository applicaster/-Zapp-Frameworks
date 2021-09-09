//
//  ScreenAnalyticsEvent.swift
//  ZappCore
//
//  Created by Alex Zchut on 08/08/2021.
//

import Foundation

public struct ScreenAnalyticsEvent {
    public static let home = "Home screen: viewed"
    public static let someScreen = "Screen viewed: "
    public static let webPageLoaded = "Loaded webview page"
    public static let tapNavbarBackButton = "Tap Navbar Back Button"
}

public struct ScreenAnalyticsEventParams {
    public static let url = "URL"
    public static let trigger = "Trigger"
    
    
}
