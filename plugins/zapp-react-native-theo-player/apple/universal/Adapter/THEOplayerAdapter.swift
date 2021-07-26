//
//  THEOplayerAdapter.swift
//  ZappTHEOplayer
//
//  Created by Anton Kononenko on 2/9/2020
//  Copyright © 2021 Applicaster. All rights reserved.
//
import Foundation
import THEOplayerSDK
import ZappCore

open class THEOplayerAdapter: NSObject, PluginAdapterProtocol {
    public var configurationJSON: NSDictionary?
    public var model: ZPPluginModel?
    public var enabled: Bool = false

    public required init(pluginModel: ZPPluginModel) {
        model = pluginModel
        configurationJSON = model?.configurationJSON
        THEOplayer.registerContentProtectionIntegration(integrationId: KeyOsDRMIntegration.integrationID,
                                                        keySystem: .FAIRPLAY,
                                                        integrationFactory: KeyOsDRMIntegrationFactory())
    }

    open func disable(completion: ((Bool) -> Void)?) {
        completion?(true)
    }

    open func prepareProvider(_ defaultParams: [String: Any], completion: ((Bool) -> Void)?) 
        completion?(true)
    }

    open var providerName: String {
        return "ZappTHEOplayer"
    }
}
