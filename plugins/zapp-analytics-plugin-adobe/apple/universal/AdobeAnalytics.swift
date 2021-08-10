//
//  AdobeAnalytics.swift
//  ZappAnalyticsPluginAdobe
//
//  Created by Alex Zchut on 20/07/2018.
//  Copyright © 2018 Applicaster. All rights reserved.
//

import AEPAnalytics
import AEPCore
import AEPIdentity
import AEPLifecycle
import AEPServices
import AEPSignal
import AEPUserProfile
import ZappCore

struct AdobeAnalyticsProviderParams {
    static let debugAppId = "mobile_app_account_id"
    static let productionAddId = "mobile_app_account_id_production"
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
            let logLevel: LogLevel = isDebug() ? .debug : .error
            let appID = isDebug() ? debugAppId : productionAddId

            #if canImport(AEPUserProfile)
                MobileCore.registerExtension(UserProfile.self)
            #endif

            MobileCore.registerExtensions([Signal.self, Identity.self, Analytics.self, Lifecycle.self], {
                #if canImport(AEPUserProfile)
                    MobileCore.registerExtension(UserProfile.self)
                #endif
                MobileCore.configureWith(appId: appID)
            })

            MobileCore.setLogLevel(logLevel)

            completion?(true)
        } else {
            disable(completion: completion)
        }
    }

    override open func prepareEventsHandlers() -> [AnalyticsEventsHandlerProtocol] {
        let adsEventsHandler = AdobeAnalyticsAdEventsHandler(delegate: self)
        return [
            AdobeAnalyticsScreenEventsHandler(delegate: self),
            AdobeAnalyticsPlayerEventsHandler(delegate: self,
                                              adEventsHandler: adsEventsHandler)
        ]
    }

    fileprivate func isDebug() -> Bool {
        guard let value = FacadeConnector.connector?.storage?.sessionStorageValue(for: "application_environment", namespace: nil) else {
            return false
        }

        return Bool(value) ?? false
    }
}
