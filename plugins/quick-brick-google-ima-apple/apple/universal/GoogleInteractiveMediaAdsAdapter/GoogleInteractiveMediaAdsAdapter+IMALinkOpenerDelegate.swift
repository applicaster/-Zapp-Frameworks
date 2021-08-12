//
//  GoogleInteractiveMediaAdsAdapter+IMALinkOpenerDelegate.swift
//  GoogleInteractiveMediaAds
//
//  Created by Anton Kononenko on 8/3/21.
//  Copyright (c) 2021 Applicaster. All rights reserved.
//

import AVFoundation
import Foundation
import GoogleInteractiveMediaAds

// MARK: - IMALinkOpenerDelegate

extension GoogleInteractiveMediaAdsAdapter: IMALinkOpenerDelegate {
    public func linkOpenerDidClose(inAppLink linkOpener: NSObject!) {
        adsManager?.resume()
    }
}
