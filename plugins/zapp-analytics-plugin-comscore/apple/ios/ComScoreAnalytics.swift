//
//  ComScoreAnalytics.swift
//  ZappAnalyticsPluginComScore
//
//  Created by Alex Zchut on 20/07/2018.
//  Copyright © 2018 Applicaster. All rights reserved.
//

import ComScore
import ZappCore

struct ComScoreAnalyticsProviderParams {
    static let customerC2Key = "customer_c2"
    static let appNameKey = "app_name"
    static let nsSiteKey = "ns_site"
    static let streamSenseKey = "stream_sense"
    static let publisherName = "ns_st_pu"
    static let c3 = "c3"
}

open class ComScoreAnalytics: AnalyticsBaseProvider {
    override public var providerName: String {
        return "comscore"
    }

    override public func prepareProvider(_ defaultParams: [String: Any], completion: ((Bool) -> Void)?) {
        super.prepareProvider(defaultParams, completion: completion)

        if let customerC2 = configurationJSON?[ComScoreAnalyticsProviderParams.customerC2Key] as? String {
            var nsSite: String?
            if let value = configurationJSON?[ComScoreAnalyticsProviderParams.nsSiteKey] as? String {
                nsSite = value
            }

            var appName = Bundle.main.infoDictionary?["CFBundleDisplayName"] as? String
            if let value = configurationJSON?[ComScoreAnalyticsProviderParams.appNameKey] as? String {
                appName = value
            }

            let publisherConfig = SCORPublisherConfiguration(builderBlock: { builder in
                if let builder = builder {
                    builder.publisherId = customerC2
                    builder.keepAliveMeasurementEnabled = true
                }
            })

            SCORAnalytics.configuration().addClient(with: publisherConfig)

            if let nsSite = nsSite {
                SCORAnalytics.configuration().setPersistentLabelWithName(ComScoreAnalyticsProviderParams.nsSiteKey, value: nsSite)
            } else if let appName = appName {
                SCORAnalytics.configuration().setPersistentLabelWithName(ComScoreAnalyticsProviderParams.nsSiteKey, value: "app-" + appName)
            }

            SCORAnalytics.start()

            completion?(true)
        } else {
            disable(completion: completion)
        }
    }

    override open func prepareEventsHandlers() -> [AnalyticsEventsHandlerProtocol] {
        let adsEventsHandler = ComScoreAnalyticsAdEventsHandler(delegate: self)
        return [
            ComScoreAnalyticsScreenEventsHandler(delegate: self),
            ComScoreAnalyticsPlayerEventsHandler(delegate: self,
                                                 adEventsHandler: adsEventsHandler),
        ]
    }
}
