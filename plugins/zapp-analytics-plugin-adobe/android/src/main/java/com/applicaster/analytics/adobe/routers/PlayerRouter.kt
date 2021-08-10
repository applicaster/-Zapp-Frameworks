package com.applicaster.analytics.adobe.routers

import androidx.annotation.CallSuper
import com.adobe.marketing.mobile.Media
import com.adobe.marketing.mobile.MediaConstants.StreamType
import com.adobe.marketing.mobile.MediaConstants.VideoMetadataKeys
import com.adobe.marketing.mobile.MediaTracker
import com.applicaster.analytics.adapters.AnalyticsPlayerAdapter
import com.applicaster.analytics.adapters.ParamsGetters
import com.applicaster.analytics.adobe.AdobeAnalyticsAgent.Companion.TAG
import com.applicaster.util.APLogger
import java.util.*

class PlayerRouter : AnalyticsPlayerAdapter() {

    private lateinit var tracker: MediaTracker

    private var adBreakObject: HashMap<String, Any>? = null
    private var adInfo: HashMap<String, Any>? = null
    private var isLive = false
    private var isVideo = true

    private var adBreakPos = 1L

    @CallSuper
    override fun onStart(params: Map<String, Any>?) {
        super.onStart(params)
        tracker = Media.createTracker()

        val mediaObject = Media.createMediaObject(
                getName(),
                getId(),
                duration!!.toDouble(),
                if(isLive) StreamType.LIVE else StreamType.VOD, // todo: other types
                if(isVideo) Media.MediaType.Video else Media.MediaType.Audio)

        val mediaMetadata = HashMap<String, String>()
        mediaMetadata[VideoMetadataKeys.EPISODE] = getName()?:""
        // todo: all video tags or audio tags

        tracker.trackSessionStart(mediaObject, mediaMetadata)
    }

    @CallSuper
    override fun onLoaded(params: Map<String, Any>?) {
        super.onLoaded(params)
    }

    @CallSuper
    override fun onStop(params: Map<String, Any>?) {
        super.onStop(params)
        sendPosition()
        tracker.trackSessionEnd()
    }

    @CallSuper
    override fun onPlay(params: Map<String, Any>?) {
        super.onPlay(params)
        sendPosition()
        tracker.trackPlay()
    }

    @CallSuper
    override fun onPause(params: Map<String, Any>?) {
        super.onPause(params)
        sendPosition()
        tracker.trackPause()
    }

    @CallSuper
    override fun onResume(params: Map<String, Any>?) {
        super.onResume(params)
        tracker.trackPlay()
    }

    // todo: not called
    fun onError(params: Map<String, Any>?) {
        super.onResume(params)
        sendPosition()
        tracker.trackError("")
    }

    @CallSuper
    override fun onAdBreakStart(params: Map<String, Any>?) {
        super.onAdBreakStart(params)
        adBreakObject = Media.createAdBreakObject(
                "adbreak-$adBreakPos", // todo: name is missing
                adBreakPos++, // for now count there
                position!!.toDouble())
        sendPosition()
        tracker.trackEvent(Media.Event.AdBreakStart, adBreakObject, null)
    }

    @CallSuper
    override fun onAdBreakEnd(params: Map<String, Any>?) {
        super.onAdBreakEnd(params)
        when(val adb = adBreakObject){
            null -> APLogger.error(TAG, "adBreakObject missing, onAdBreakEnd called without calling onAdBreakStart or called twice")
            else -> {
                sendPosition()
                tracker.trackEvent(Media.Event.AdBreakComplete, adb, null)
                adBreakObject = null
            }
        }
    }

    @CallSuper
    override fun onAdStart(params: Map<String, Any>?) {
        super.onAdStart(params)

        val id = params?.get(KEY_AD_ID)?.toString()
        if (id.isNullOrEmpty()) {
            APLogger.error(TAG, "$KEY_AD_ID is missing in the event $AD_START_EVENT data")
            return
        }

        val duration = ParamsGetters.getLong(params, KEY_AD_DURATION)

        if (null == duration) {
            APLogger.error(TAG, "$KEY_AD_DURATION is missing in the event $AD_START_EVENT data")
            return
        }

        val pos = ParamsGetters.getInt(params, KEY_AD_POSITION)

        if (null == pos) {
            APLogger.warn(TAG, "$KEY_AD_POSITION is missing in the event $AD_START_EVENT data")
            return
        }

        adInfo = Media.createAdObject(id, id, pos.toLong(), duration.toDouble())
        sendPosition()
        tracker.trackEvent(Media.Event.AdStart, adInfo, null)
    }

    @CallSuper
    override fun onAdEnd(params: Map<String, Any>?) {
        super.onAdEnd(params)
        sendPosition()
        when(val adb = adInfo){
            null -> APLogger.error(TAG, "adInfo missing, onAdEnd called without calling onAdStart or called twice")
            else -> {
                tracker.trackEvent(Media.Event.AdComplete, adb, null)
                adInfo = null
            }
        }
    }

    @CallSuper
    override fun onSeek(params: Map<String, Any>?) {
        super.onSeek(params)
        sendPosition()
        tracker.trackEvent(Media.Event.SeekStart, null, null)
    }

    @CallSuper
    override fun onSeekEnd(params: Map<String, Any>?) {
        super.onSeekEnd(params)
        sendPosition()
        tracker.trackEvent(Media.Event.SeekComplete, null, null)
    }

    @CallSuper
    override fun onBuffering(params: Map<String, Any>?) {
        super.onBuffering(params)
        // todo: buffer complete
        sendPosition()
        tracker.trackEvent(Media.Event.BufferStart, null, null)
    }

    // todo: send periodically
    private fun sendPosition() {
        when {
            //  time from midnight in seconds
            isLive -> tracker.updateCurrentPlayhead((System.currentTimeMillis() / 1000 % 86400).toDouble())
            else -> position?.let { tracker.updateCurrentPlayhead(it / 1000.0) }
        }
    }

    @CallSuper
    override fun onComplete(params: Map<String, Any>?) {
        super.onComplete(params)
        tracker.trackComplete()
    }

}