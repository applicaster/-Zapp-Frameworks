//
//  ComScoreAnalytics.swift
//  ZappAnalyticsPluginComScore
//
//  Created by Alex Zchut on 20/07/2018.
//  Copyright © 2018 Applicaster. All rights reserved.
//

import ComScore
import ZappAnalyticsPluginsSDK
import ZappPlugins

open class ComScoreAnalytics: NSObject, PluginAdapterProtocol {
    open var configurationJSON: NSDictionary?

    struct Params {
        static let customerC2Key = "customer_c2"
        static let appNameKey = "app_name"
        static let nsSiteKey = "ns_site"
        static let streamSenseKey = "stream_sense"
        static let publisherName = "ns_st_pu"
        static let c3 = "c3"
    }

    var isDisabled = false
    var playbackStalled: Bool = false

    var lastProceededItemID: String?
    var lastProceededItemParams: [String: String]?
    var lastProceededItemContentType: SCORStreamingContentType = .other
    
    var adIsPlaying: Bool = false
    var lastProceededPlayerEvent: String?
    var lastProceededAdEvent: String?
    var lastProceededScreenEvent: String?
    var streamAnalyticsForContent: SCORStreamingAnalytics?
    var streamAnalyticsForAds: SCORStreamingAnalytics?

    public var model: ZPPluginModel?
    public var providerName: String {
        return getKey()
    }
    
    public lazy var publisherName: String = {
        return configurationJSON?[Params.publisherName] as? String ?? ""
    }()

    public lazy var c3: String = {
        return configurationJSON?[Params.c3] as? String ?? ""
    }()
    
    public func getKey() -> String {
        return "comscore"
    }

    public required init(pluginModel: ZPPluginModel) {
        model = pluginModel
        configurationJSON = model?.configurationJSON
    }

    public func prepareProvider(_ defaultParams: [String: Any], completion: ((Bool) -> Void)?) {
        if let customerC2 = configurationJSON?[Params.customerC2Key] as? String {
            var nsSite: String?
            if let value = configurationJSON?[Params.nsSiteKey] as? String {
                nsSite = value
            }

            var appName = Bundle.main.infoDictionary?["CFBundleDisplayName"] as? String
            if let value = configurationJSON?[Params.appNameKey] as? String {
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
                SCORAnalytics.configuration().setPersistentLabelWithName(Params.nsSiteKey, value: nsSite)
            } else if let appName = appName {
                SCORAnalytics.configuration().setPersistentLabelWithName(Params.nsSiteKey, value: "app-" + appName)
            }

            SCORAnalytics.start()

            completion?(true)
        } else {
            disable(completion: completion)
        }
    }
    
    public func disable(completion: ((Bool) -> Void)?) {
        disable()
        completion?(true)
    }

    fileprivate func disable() {
        isDisabled = true
    }
}
