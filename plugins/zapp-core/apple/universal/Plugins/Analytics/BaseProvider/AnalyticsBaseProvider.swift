//
//  AnalyticsBaseProvider.swift
//  ZappCore
//
//  Created by Alex Zchut on 09/08/2021.
//

import Foundation

open class AnalyticsBaseProvider: NSObject, PluginAdapterProtocol {
    open var configurationJSON: NSDictionary?
    public var isDisabled = false

    open var model: ZPPluginModel?
    open var providerName: String {
        return "\(self)"
    }

    var handlers: [AnalyticsEventsHandlerProtocol]?

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
