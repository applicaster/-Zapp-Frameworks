//
//  AnalyticsBaseEventsHandler.swift
//  ZappCore
//
//  Created by Alex Zchut on 11/08/2021.
//

import Foundation

open class AnalyticsBaseEventsHandler: NSObject, AnalyticsEventsHandlerProtocol {
    public weak var delegate:AnalyticsEventsHandlerDelegate?

    public var lastProceededEvent: String?
    open var shouldBlockParentHandler: Bool = false

    public init(delegate: AnalyticsEventsHandlerDelegate?) {
        super.init()
        self.delegate = delegate
    }
    
    open func handleEvent(name: String, parameters: [String: Any]?) -> Bool {
        let retValue = false

        // skip same event
        guard name != lastProceededEvent else {
            return true
        }
        
        return retValue
    }
    
    open func proceedEvent(_ eventName: String) -> Bool {
        lastProceededEvent = eventName
        return true
    }
}
