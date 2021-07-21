//
//  APAnalyticsProviderComScore.swift
//  ZappAnalyticsPluginComScore
//
//  Created by Alex Zchut on 20/07/2018.
//  Copyright © 2018 Applicaster. All rights reserved.
//

import ComScore
import ZappAnalyticsPluginsSDK
import ZappPlugins

open class APAnalyticsProviderComScore: ZPAnalyticsProvider, PlayerDependantPluginProtocol {
    public var playerPlugin: PlayerProtocol?
    var playbackStalled: Bool = false
    var comscoreObjHelper:APStreamSenseManager?
    
    let kCustomerC2Key = "customer_c2"
    let kAppNameKey = "app_name"
    let kNsSiteKey = "ns_site"
    let kStreamSenseKey = "stream_sense"
    let kPublisherName = "ns_st_pu"
    let kC3 = "c3"

    override open func getKey() -> String {
        return "comscore"
    }

    override open func configureProvider() -> Bool {
        guard let customerC2 = providerProperties[kCustomerC2Key] as? String else {
            return false
        }

        var nsSite: String?
        if let value = providerProperties[kNsSiteKey] as? String {
            nsSite = value
        }
        
        var appName = Bundle.main.infoDictionary?["CFBundleDisplayName"] as? String
        if let value = providerProperties[kAppNameKey] as? String {
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
            SCORAnalytics.configuration().setPersistentLabelWithName(kNsSiteKey, value: nsSite)
        } else if let appName = appName {
            SCORAnalytics.configuration().setPersistentLabelWithName(kNsSiteKey, value: "app-" + appName)
        }

        SCORAnalytics.start()

        comscoreObjHelper = APStreamSenseManager(providerProperties: providerProperties,
                                                 delegate: self)

        return true
    }
}

extension APAnalyticsProviderComScore: APStreamSenseManagerDelegate {
    public func getCurrentPlayerInstance() -> AVPlayer? {
        return playerPlugin?.playerObject as? AVPlayer
    }
}
