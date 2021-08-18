//
//  EventsBusPredefinedType+AnalyticsSubtypes.swift
//  ZappCore
//
//  Created by Alex Zchut on 16/02/2021.
//

import Foundation

public enum EventsBusTypePlayerAdSubtype: String {
    case undefined
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
