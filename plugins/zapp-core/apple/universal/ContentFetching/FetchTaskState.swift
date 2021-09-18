//
//  FetchTaskState.swift
//  ZappCore
//
//  Created by Alex Zchut on 05/08/2021.
//  Copyright © 2021 Applicaster LTD. All rights reserved.
//

public enum FetchTaskState {
    case pending
    case inProgess(Int)
    case completed
    case failed(Error)
    
    public static func == (lhs: FetchTaskState, rhs: FetchTaskState) -> Bool {
        switch (lhs, rhs) {
        case let (.inProgess(a1), .inProgess(a2)):
            return a1 == a2
        case let (.failed(a1), .failed(a2)):
            return a1.localizedDescription == a2.localizedDescription
        case (.pending, .pending):
            return true
        case (.completed, .completed):
            return true
            
        default:
            return false
        }
    }
}
