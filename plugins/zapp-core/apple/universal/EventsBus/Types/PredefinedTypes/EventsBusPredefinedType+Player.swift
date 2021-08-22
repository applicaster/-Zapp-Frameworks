//
//  EventsBusPredefinedType+Player.swift
//  ZappCore
//
//  Created by Alex Zchut on 16/02/2021.
//

import Foundation

public enum EventsBusTypePlayerSubtype: String {
    case undefined
    case presented
    case seekComplete
    case seekStart
    case sessionWillEnd
    case sessionDidEnd
    case sessionWillStart
    case sessionDidStart
    case videoEnd
    case videoError
    case videoWillLoad
    case videoDidLoad
    case videoProgress
    case videoBufferingStart
    case videoBufferingComplete
    case videoPlaybackRateChange
    case adBegin
    case adBreakBegin
    case adBreakEnd
    case adEnd
    case adSkip
    case adProgress
    case adError
    
    public var value: String {
        return rawValue
    }
}
