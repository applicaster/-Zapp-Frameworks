//
//  AnalyticsBaseProvider.swift
//  ZappCore
//
//  Created by Alex Zchut on 09/08/2021.
//

import Foundation

open class AnalyticsBaseProvider: NSObject, PluginAdapterProtocol, AnalyticsEventsHandlerDelegate {
    open var configurationJSON: NSDictionary?
    public var isDisabled = false

    open var model: ZPPluginModel?
    open var providerName: String {
        return "\(self)"
    }

    var handlers: [AnalyticsEventsHandlerProtocol]?
    open var externalObject: AnyObject? {
        get {
            return nil
        }
        set {
            
        }
    }
    
    public required init(pluginModel: ZPPluginModel) {
        model = pluginModel
        configurationJSON = model?.configurationJSON
    }

    open func prepareProvider(_ defaultParams: [String: Any], completion: ((Bool) -> Void)?) {
        handlers = prepareEventsHandlers()
    }
    
    open func prepareEventsHandlers() -> [AnalyticsEventsHandlerProtocol] {
        return []
    }

    open func disable(completion: ((Bool) -> Void)?) {
        disable()
        completion?(true)
    }

    fileprivate func disable() {
        isDisabled = true
    }
}

extension AnalyticsBaseProvider {
    public func isDebug() -> Bool {
        guard let value = FacadeConnector.connector?.applicationData?.isDebugEnvironment() else {
            return false
        }

        return Bool(value)
    }
}
