//
//  PlayerAnalyticsEvent.swift
//  ZappCore
//
//  Created by Alex Zchut on 08/08/2021.
//

import Foundation

public struct PlayerAnalyticsEvent {
    public static let initial = "Play VOD Item.start"
    public static let created = "Player Created"
    public static let dismissed = "Player Closed"
    public static let play = "Player Playing"
    public static let resume = "Player Resume"
    public static let paused = "Player Pause"
    public static let seeking = "Player Seek"
    public static let seeked = "Player Seek End"
    public static let ended = "Player Ended"
    public static let buffering = "Player Buffering"
    public static let entryLoaded = "Media Entry Load"
    public static let videoLoaded = "Player Loaded Video"
}
