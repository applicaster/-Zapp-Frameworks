//
//  PlayerAnalyticsEvent.swift
//  ZappCore
//
//  Created by Alex Zchut on 08/08/2021.
//

import Foundation

public struct PlayerAnalyticsEvent {
    public static let playerPresented = "Player: Presented"
    public static let playerClosed = "Player: Closed"
    public static let sessionEnd = "Player: Session End"
    public static let sessionStart = "Player: Session Start"

    public static let play = "Player: Play"
    public static let pause = "Player: Pause"
    public static let complete = "Player: Complete"
    public static let error = "Player: Error"
    public static let bufferStart = "Player: Buffer Start"
    public static let bufferComplete = "Player: Buffer Complete"
    public static let seekStart = "Player: Seek Start"
    public static let seekComplete = "Player: Seek Complete"
    
    public static let stop = "Player: Stop"
    public static let next = "Player: Next"
    public static let previous = "Player: Previous"
}
