package com.applicaster.analytics.comscore.adapters

import com.applicaster.analytics.adapters.AnalyticsScreenAdapter
import com.comscore.Analytics
import java.util.*

class ScreenAdapter: AnalyticsScreenAdapter() {
    override fun onOpenScreen(screenName: String, params: TreeMap<String, String>?) {
        super.onOpenScreen(screenName, params)
        // todo: other params?
        Analytics.notifyViewEvent(mapOf("ns_category" to screenName))
    }

    override fun onOpenHome(eventName: String, params: TreeMap<String, String>?) {
        super.onOpenHome(eventName, params)
        Analytics.notifyViewEvent(mapOf("ns_category" to "home"))
    }
}