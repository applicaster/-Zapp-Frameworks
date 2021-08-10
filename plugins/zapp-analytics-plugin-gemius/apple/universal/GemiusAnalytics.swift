//
//  GemiusAnalytics.swift
//  GemiusAnalytics
//
//  Created by Alex Zchut on 29/03/2021.
//  Copyright © 2021 Applicaster Ltd. All rights reserved.
//

import AVFoundation
import Foundation
import GemiusSDK
import ZappCore

struct GemiusAnalyticsProviderParams {
    static let scriptIdentifier = "script_identifier"
    static let hitCollectorHost = "hit_collector_host"
    static let pluginIdentifier = "applicaster-cmp-gemius"
    static let storageKeyUserAgent = "webview_user_agent"
}

class GemiusAnalytics: AnalyticsBaseProvider {
    override public var providerName: String {
        return "GemiusAnalytics"
    }

    var gemiusPlayerObject: GSMPlayer?
    override var externalObject: AnyObject? {
        get {
            return gemiusPlayerObject
        }
        set (newValue) {
            if let value = newValue as? GSMPlayer {
                gemiusPlayerObject = value
            }
        }
    }
    
    lazy var scriptIdentifier: String = {
        guard let scriptIdentifier = model?.configurationValue(for: GemiusAnalyticsProviderParams.scriptIdentifier) as? String else {
            return ""
        }
        return scriptIdentifier
    }()

    lazy var hitCollectorHost: String = {
        guard let hitCollectorHost = model?.configurationValue(for: GemiusAnalyticsProviderParams.hitCollectorHost) as? String else {
            return ""
        }
        return hitCollectorHost
    }()

    override public func prepareProvider(_ defaultParams: [String: Any], completion: ((Bool) -> Void)?) {
        super.prepareProvider(defaultParams, completion: completion)

        if scriptIdentifier.isEmpty == false,
           hitCollectorHost.isEmpty == false {
            GEMAudienceConfig.sharedInstance()?.hitcollectorHost = hitCollectorHost
            GEMAudienceConfig.sharedInstance()?.scriptIdentifier = scriptIdentifier
            GEMConfig.sharedInstance()?.loggingEnabled = isDebug()

            if let appName = FacadeConnector.connector?.applicationData?.bundleName(),
               appName.isEmpty == false,
               let appVersion = FacadeConnector.connector?.storage?.sessionStorageValue(for: "version_name", namespace: nil),
               appVersion.isEmpty == false {
                GEMConfig.sharedInstance()?.setAppInfo(appName, version: appVersion)

                saveWebViewUserAgent()
            }

            completion?(true)
        } else {
            disable(completion: completion)
        }
    }

    fileprivate func isDebug() -> Bool {
        guard let value = FacadeConnector.connector?.applicationData?.isDebugEnvironment() else {
            return false
        }

        return Bool(value)
    }

    fileprivate func saveWebViewUserAgent() {
        DispatchQueue.global(qos: .default).async {
            guard let useragent = GEMConfig.sharedInstance()?.getUA4WebView() else {
                return
            }

            DispatchQueue.main.async {
                _ = FacadeConnector.connector?.storage?.sessionStorageSetValue(for: GemiusAnalyticsProviderParams.storageKeyUserAgent,
                                                                               value: useragent,
                                                                               namespace: nil)
            }
        }
    }
}
