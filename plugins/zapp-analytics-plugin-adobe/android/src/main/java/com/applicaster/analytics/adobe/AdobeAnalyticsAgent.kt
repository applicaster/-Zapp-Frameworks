package com.applicaster.analytics.adobe

import android.app.Application
import android.content.Context
import android.text.TextUtils
import com.adobe.marketing.mobile.*
import com.applicaster.analytics.BaseAnalyticsAgent
import com.applicaster.analytics.adapters.IAnalyticsAdapter
import com.applicaster.analytics.adobe.routers.PlayerRouter
import com.applicaster.analytics.adobe.routers.ScreenAdapter
import com.applicaster.util.APDebugUtil
import com.applicaster.util.APLogger
import com.applicaster.util.AppContext
import java.util.*

class AdobeAnalyticsAgent : BaseAnalyticsAgent() {

    private var mobileAppAccountIdDebug: String? = null
    private var mobileAppAccountIdProduction: String? = null

    private val routers = mutableListOf<IAnalyticsAdapter>()

    override fun setParams(params: Map<*, *>) {
        super.setParams(params)
        mobileAppAccountIdDebug = getValue(params, MOBILE_APP_ACCOUNT_ID_IDENTIFIER)
        mobileAppAccountIdProduction = getValue(params, MOBILE_APP_ACCOUNT_ID_IDENTIFIER_PRODUCTION)
    }

    override fun initializeAnalyticsAgent(context: Context) {
        super.initializeAnalyticsAgent(context)

        if (TextUtils.isEmpty(mobileAppAccountIdDebug)) {
            APLogger.error(TAG, "Missing parameter: $MOBILE_APP_ACCOUNT_ID_IDENTIFIER")
            return
        }

        if (TextUtils.isEmpty(mobileAppAccountIdProduction)) {
            APLogger.error(TAG, "Missing parameter: $MOBILE_APP_ACCOUNT_ID_IDENTIFIER_PRODUCTION")
            return
        }

        MobileCore.setApplication(AppContext.get() as Application)

        MobileCore.setLogLevel(when {
            isDebug -> LoggingMode.DEBUG
            else -> LoggingMode.ERROR
        })

        try {
            Analytics.registerExtension()
            UserProfile.registerExtension();
            Identity.registerExtension()
            Lifecycle.registerExtension()
            Signal.registerExtension()
            MobileCore.start {
                val appId = if (isDebug) mobileAppAccountIdDebug else mobileAppAccountIdProduction
                MobileCore.configureWithAppID(appId)
                routers.clear()
                routers.add(PlayerRouter())
                routers.add(ScreenAdapter())
            }
        } catch (e: InvalidInitException) {
            APLogger.error(TAG, "Failed to initialize AdobeAnalyticsAgent", e)
        }
    }

    override fun logEvent(eventName: String, params: TreeMap<String, String>) {
        super.logEvent(eventName, params)
        routers.any { it.routeEvent(eventName, params) }
    }

    override fun stopTrackingSession(context: Context?) {
        super.stopTrackingSession(context)
        routers.clear()
    }

    override fun resumeTracking(context: Context) {
        super.resumeTracking(context)
        MobileCore.setApplication(AppContext.get() as Application)
        MobileCore.lifecycleStart(null)
        routers.clear()
        routers.add(PlayerRouter())
        routers.add(ScreenAdapter())
    }

    companion object {
        const val TAG = "AdobeAnalyticsAgent"

        private const val MOBILE_APP_ACCOUNT_ID_IDENTIFIER = "mobile_app_account_id"
        private const val MOBILE_APP_ACCOUNT_ID_IDENTIFIER_PRODUCTION = "mobile_app_account_id_production"

        private var isDebug = APDebugUtil.getIsInDebugMode()

        private fun getValue(params: Map<*, *>, key: String) = params[key]?.toString() ?: ""
    }
}