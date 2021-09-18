package com.applicaster.analytics.comscore

import android.content.Context
import android.util.Log
import com.applicaster.analytics.BaseAnalyticsAgent
import com.applicaster.analytics.adapters.IAnalyticsAdapter
import com.applicaster.analytics.comscore.adapters.PlayerAdapter
import com.applicaster.analytics.comscore.adapters.ScreenAdapter
import com.comscore.Analytics
import com.comscore.PublisherConfiguration
import java.lang.ref.WeakReference
import java.util.*

class ComScoreAgent : BaseAnalyticsAgent() {
    private var mContext: WeakReference<Context?>? = null

    private var customerC2: String? = null // AKA Publisher ID
    private var customerC3: String? = null
    private var appName: String? = null
    private var nsSite: String? = null
    private var nsStPu: String? = null

    // todo: AnalyticsAnalytics.notifyUxActive() for BG audio

    private val adapters: MutableList<IAnalyticsAdapter> = mutableListOf()

    override fun setParams(params: Map<*, *>) {
        super.setParams(params)
        customerC2 = getValue(params, COMSCORE_CUSTOMER_C2_IDENTIFIER)
        customerC3 = getValue(params, COMSCORE_CUSTOMER_C3_IDENTIFIER)
        appName = getValue(params, COMSCORE_APP_NAME_IDENTIFIER)
        nsSite = getValue(params, COMSCORE_NS_SITE_IDENTIFIER)
        nsStPu = getValue(params, COMSCORE_NS_ST_PU)
    }

    private fun getValue(params: Map<*, *>, key: String): String {
        var returnVal = ""
        if (params[key] != null) {
            returnVal = params[key].toString()
        }
        return returnVal
    }

    override fun initializeAnalyticsAgent(context: Context) {
        super.initializeAnalyticsAgent(context)
        mContext = WeakReference(context)
        val publisherConfig = PublisherConfiguration.Builder()
                .publisherId(customerC2) // Provide your Publisher ID here.
                .keepAliveMeasurement(true)
                .build()
        Analytics.getConfiguration().addClient(publisherConfig)
        if (nsSite != null) {
            Analytics.getConfiguration().setPersistentLabel("nsSite", nsSite)
        }
        if(!appName.isNullOrEmpty()){
            Analytics.getConfiguration().setApplicationName(appName)
        }
        Analytics.setLogLevel(Log.DEBUG)
        Analytics.start(context)
        adapters.add(PlayerAdapter())
        adapters.add(ScreenAdapter())
    }

    override fun getConfiguration(): Map<String, String> {
        val configuration = super.getConfiguration()
        configuration[COMSCORE_CUSTOMER_C2_IDENTIFIER] = customerC2!!
        configuration[COMSCORE_APP_NAME_IDENTIFIER] = appName!!
        configuration[COMSCORE_NS_SITE_IDENTIFIER] = nsSite!!
        configuration[COMSCORE_NS_ST_PU] = nsStPu!!
        return configuration
    }

    // we don't bother with timed events there, not needed in our case
    override fun logEvent(eventName: String, params: TreeMap<String, String>) {
        super.logEvent(eventName, params)
        adapters.any { it.routeEvent(eventName, params) }
    }

    companion object {
        private const val TAG = "ComScoreAgent"
        private const val COMSCORE_CUSTOMER_C2_IDENTIFIER = "customer_c2"
        private const val COMSCORE_APP_NAME_IDENTIFIER = "app_name"
        private const val COMSCORE_NS_SITE_IDENTIFIER = "ns_site"
        private const val COMSCORE_NS_ST_PU = "ns_st_pu"
        private const val COMSCORE_CUSTOMER_C3_IDENTIFIER = "customer_c3"
    }
}