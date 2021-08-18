//
//  GoogleInteractiveMediaAdsAdapter+IMAAdsManagerDelegate.swift
//  GoogleInteractiveMediaAds
//
//  Created by Anton Kononenko on 7/25/19.
//  Copyright (c) 2020 Applicaster. All rights reserved.
//

import AVFoundation
import Foundation
import GoogleInteractiveMediaAds
import ZappCore

extension GoogleInteractiveMediaAdsAdapter: IMAAdsManagerDelegate {
    var delegate: DependablePlayerAdDelegatePluginProtocol? {
        return playerPlugin as? DependablePlayerAdDelegatePluginProtocol
    }

    public func adsManager(_ adsManager: IMAAdsManager?, didReceive event: IMAAdEvent?) {
        switch event?.type {
        case .LOADED:
            adsManager?.start()
            isPrerollAdLoading = false
        case .ALL_ADS_COMPLETED:
            if let urlTagData = urlTagData, urlTagData.isVmapAd {
                isVMAPAdsCompleted = true
            }
            postrollCompletion?(true)
        case .SKIPPED:
            EventsBus.post(EventsBus.Event(type: EventsBusType(.playerAd(.adSkip)),
                                           source: "\(kNativeSubsystemPath)/GoogleInteractiveMediaAds",
                                           data: [
                                               "content": urlTagData?.content ?? [:],

                                           ]))
            if let playerPlugin = playerPlugin {
                FacadeConnector.connector?.playerDependant?.playerAdSkiped(player: playerPlugin)
            }
        default:
            return
        }
    }

    public func adsManagerDidRequestContentPause(_ adsManager: IMAAdsManager!) {
        delegate?.advertisementWillPresented(provider: self)
        EventsBus.post(EventsBus.Event(type: EventsBusType(.playerAd(.adBegin)),
                                       source: "\(kNativeSubsystemPath)/GoogleInteractiveMediaAds",
                                       data: [
                                           "content": urlTagData?.content ?? [:],
                                       ]))
        if let playerPlugin = playerPlugin {
            FacadeConnector.connector?.playerDependant?.playerAdStarted(player: playerPlugin)
        }
        // The SDK is going to play ads, so pause the content.
        pausePlayback()
    }

    public func adsManager(_ adsManager: IMAAdsManager!, didReceive error: IMAAdError!) {
        delegate?.advertisementFailedToLoad(provider: self)
        EventsBus.post(EventsBus.Event(type: EventsBusType(.playerAd(.adError)),
                                       source: "\(kNativeSubsystemPath)/GoogleInteractiveMediaAds",
                                       data: [
                                           "content": urlTagData?.content ?? [:],
                                           "error": error.description,
                                       ]))
        // Something went wrong with the ads manager after ads were loaded. Log the error and play the
        // content.
        isPrerollAdLoading = false
        if let completion = postrollCompletion {
            completion(true)
            postrollCompletion = nil
            adsLoader?.contentComplete()
        } else {
            resumePlayback()
        }
    }

    public func adsManagerDidRequestContentResume(_ adsManager: IMAAdsManager!) {
        delegate?.advertisementWillDismissed(provider: self)
        EventsBus.post(EventsBus.Event(type: EventsBusType(.playerAd(.adEnd)),
                                       source: "\(kNativeSubsystemPath)/GoogleInteractiveMediaAds",
                                       data: [
                                           "content": urlTagData?.content ?? [:],
                                       ]))
        if let playerPlugin = playerPlugin {
            FacadeConnector.connector?.playerDependant?.playerAdCompleted(player: playerPlugin)
        }
        // The SDK is done playing ads (at least for now), so resume the content.
        resumePlayback()
    }

    public func adsManager(_ adsManager: IMAAdsManager!, adDidProgressToTime mediaTime: TimeInterval, totalTime: TimeInterval) {
        EventsBus.post(EventsBus.Event(type: EventsBusType(.playerAd(.adProgress)),
                                       source: "\(kNativeSubsystemPath)/GoogleInteractiveMediaAds",
                                       data: [
                                           "progress": mediaTime,
                                           "duration": totalTime,
                                       ]))
        if let playerPlugin = playerPlugin {
            FacadeConnector.connector?.playerDependant?.playerAdProgressUpdate(player: playerPlugin, currentTime: mediaTime, duration: totalTime)
        }
    }
}
