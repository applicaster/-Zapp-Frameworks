//
//  AdobeAnalytics.swift
//  ZappAnalyticsPluginAdobe
//
//  Created by Alex Zchut on 10/08/2021.
//  Copyright © 2021 Applicaster. All rights reserved.
//

import ACPAnalytics
import ACPCore
import ZappCore

struct AdobeAnalyticsProviderParams {
    static let debugAppId = "mobile_app_account_id"
    static let productionAddId = "mobile_app_account_id_production"
}

struct AdobeAnalyticsProviderEventsNames {
    static let sessionStart = "video start"
    static let partialComplete = "video_reach_"
    static let complete = "video_complete"
}

open class AdobeAnalytics: AnalyticsBaseProvider {
    override public var providerName: String {
        return "adobe"
    }

    override public func prepareProvider(_ defaultParams: [String: Any], completion: ((Bool) -> Void)?) {
        super.prepareProvider(defaultParams, completion: completion)

        if let debugAppId = configurationJSON?[AdobeAnalyticsProviderParams.debugAppId] as? String,
           !debugAppId.isEmpty,
           let productionAddId = configurationJSON?[AdobeAnalyticsProviderParams.productionAddId] as? String,
           !productionAddId.isEmpty {
            
            let logLevel: ACPMobileLogLevel = isDebug() ? .debug : .error
            let appID = isDebug() ? debugAppId : productionAddId

            ACPCore.setLogLevel(logLevel)
            ACPCore.configure(withAppId: appID)
            ACPAnalytics.registerExtension()
            ACPIdentity.registerExtension()
            ACPLifecycle.registerExtension()
            ACPSignal.registerExtension()
            ACPCore.start {
                ACPCore.lifecycleStart(nil)
            }

            completion?(true)
        } else {
            disable(completion: completion)
        }
    }

    override open func prepareEventsHandlers() -> [AnalyticsBaseEventsHandler] {
        return [
            AdobeAnalyticsScreenEventsHandler(delegate: self),
            AdobeAnalyticsPlayerEventsHandler(delegate: self),
        ]
    }
}
