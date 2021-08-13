package com.applicaster.analytics.comscore.adapters

import com.applicaster.analytics.adapters.AnalyticsPlayerAdapter
import com.applicaster.util.APLogger
import com.comscore.streaming.AdvertisementMetadata
import com.comscore.streaming.AdvertisementType
import com.comscore.streaming.ContentMetadata
import com.comscore.streaming.StreamingAnalytics

class PlayerAdapter() : AnalyticsPlayerAdapter() {

    private var contentMetadata: ContentMetadata? = null
    private val streamingAnalytics: StreamingAnalytics = StreamingAnalytics()

    override fun onStart(params: Map<String, Any>?) {
        super.onStart(params)
        // todo: check if audio only
        contentMetadata = ContentMetadata.Builder()
                .episodeTitle(getName())
                .uniqueId(getId())
                .apply { duration?.let { length(it * 1000L) } }
                .build()
        streamingAnalytics.setMetadata(contentMetadata)
    }

    override fun onPlay(params: Map<String, Any>?) {
        super.onPlay(params)
        sendPosition()
        streamingAnalytics.notifyPlay()
    }

    private fun sendPosition() {
        val pos = position
        if (null != pos && pos > 0) {
            streamingAnalytics.startFromPosition(pos * 1000)
        }
    }

    override fun onStop(params: Map<String, Any>?) {
        super.onStop(params)
        streamingAnalytics.notifyEnd()
    }

    override fun onPause(params: Map<String, Any>?) {
        super.onPause(params)
        streamingAnalytics.notifyPause()
    }

    override fun onResume(params: Map<String, Any>?) {
        super.onResume(params)
        streamingAnalytics.notifyPlay()
    }

    override fun onBuffering(params: Map<String, Any>?) {
        super.onBuffering(params)
        streamingAnalytics.notifyBufferStart() // todo: missing event for buffering end
    }

    override fun onAdBreakStart(params: Map<String, Any>?) {
        super.onAdBreakStart(params)
        // not reported, each ad will report on its own
    }

    override fun onAdBreakEnd(params: Map<String, Any>?) {
        super.onAdBreakEnd(params)
        // notify we are playing content again
        streamingAnalytics.setMetadata(contentMetadata)
        sendPosition() // new content, new position
    }

    override fun onAdStart(params: Map<String, Any>?) {
        super.onAdStart(params)

        val builder = AdvertisementMetadata.Builder()
                .relatedContentMetadata(contentMetadata)
                .numberInBreak(position?.toInt() ?: 1)

        val id = params?.get(KEY_AD_ID)?.toString() ?: ""
        if (id.isEmpty()) {
            APLogger.warn(TAG, "$KEY_AD_ID is missing in the event $AD_START_EVENT data")
        } else {
            builder.uniqueId(id)
        }

        when (val d = getLong(params, KEY_AD_DURATION)) {
            null -> APLogger.warn(TAG, "$KEY_AD_DURATION is missing in the event $AD_START_EVENT data")
            else -> builder.length(d * 1000L)
        }

        when(getLong(params, KEY_AD_BREAK_START_TIME)) {
            null -> APLogger.warn(TAG, "$KEY_AD_BREAK_START_TIME is missing in the event $AD_START_EVENT data")
            0L -> builder.mediaType(AdvertisementType.ON_DEMAND_PRE_ROLL)
            -1L -> builder.mediaType(AdvertisementType.ON_DEMAND_POST_ROLL)
            else -> builder.mediaType(AdvertisementType.ON_DEMAND_MID_ROLL)
        }

        when (val d = getInt(params, KEY_AD_POSITION)) {
            null -> APLogger.warn(TAG, "$KEY_AD_POSITION is missing in the event $AD_START_EVENT data")
            else -> builder.numberInBreak(d)
        }

        var breakSize = 1 // assume 1 by default
        when (val d = getInt(params, KEY_AD_BREAK_SIZE)) {
            null -> APLogger.warn(TAG, "$KEY_AD_BREAK_SIZE is missing in the event $AD_START_EVENT data")
            else -> breakSize = d.toInt()
        }
        builder.totalInBreak(breakSize)

        streamingAnalytics.setMetadata(builder.build())
        streamingAnalytics.notifyPlay()
    }

    override fun onAdEnd(params: Map<String, Any>?) {
        super.onAdEnd(params)
        // do nothing probably
        // (content start will be handled in ad break end,
        // new ad will trigger new ad metadata)
    }

    override fun onSeek(params: Map<String, Any>?) {
        super.onSeek(params)
        streamingAnalytics.notifySeekStart()
    }

    override fun onSeekEnd(params: Map<String, Any>?) {
        super.onSeekEnd(params)
        streamingAnalytics.startFromPosition(position?:0)
    }

    override fun onComplete(params: Map<String, Any>?) {
        super.onComplete(params)
        streamingAnalytics.notifyEnd()
    }

    companion object {
        const val TAG = "ComScorePlayerAdapter"

        // todo: move to library
        fun getLong(params: Map<String, Any>?, key: String): Long? {
            if(null == params) return null
            return when (val d = params[key]) {
                is String -> d.toFloat().toLong()
                is Number -> d.toLong()
                else -> null
            }
        }

        // todo: move to library
        fun getInt(params: Map<String, Any>?, key: String): Int? {
            if(null == params) return null
            return when (val d = params[key]) {
                is String -> d.toFloat().toInt()
                is Number -> d.toInt()
                else -> null
            }
        }
    }
}