package com.applicaster.analytics.adobe.routers

import com.adobe.marketing.mobile.MobileCore
import com.applicaster.analytics.adapters.AnalyticsScreenAdapter
import java.util.*

class ScreenAdapter: AnalyticsScreenAdapter() {
    override fun onOpenScreen(screenName: String, params: TreeMap<String, String>?) {
        super.onOpenScreen(screenName, params)
        MobileCore.trackState(screenName, mapOf())
    }

    override fun onOpenHome(eventName: String, params: TreeMap<String, String>?) {
        super.onOpenHome(eventName, params)
        MobileCore.trackState("home", mapOf())
    }
}