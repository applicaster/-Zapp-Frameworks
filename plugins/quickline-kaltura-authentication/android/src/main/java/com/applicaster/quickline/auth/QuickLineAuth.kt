package com.applicaster.quickline.auth

import android.app.Activity
import android.content.Context
import android.net.Uri
import androidx.annotation.WorkerThread
import androidx.appcompat.app.AlertDialog
import com.applicaster.identityservice.UUIDUtil
import com.applicaster.plugin_manager.GenericPluginI
import com.applicaster.plugin_manager.Plugin
import com.applicaster.plugin_manager.hook.ApplicationLoaderHookUpI
import com.applicaster.plugin_manager.hook.HookListener
import com.applicaster.quickline.auth.kaltura.IKalturaAPI
import com.applicaster.quickline.auth.kaltura.KalturaFlows
import com.applicaster.util.APLogger
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL


class QuickLineAuth : ApplicationLoaderHookUpI, GenericPluginI {

    private var partnerId: Long = IKalturaAPI.partnerId
    private var kalturaAPIEndpoint: String = KalturaFlows.KalturaEndpoint

    @WorkerThread
    private fun runInitialFlow(
        activity: Activity,
        uri: Uri,
        listener: HookListener,
        uuid: String
    ) {
        try {
            val ks = urlRegistration(uri, uuid)
            // erase the intent so QB will not try to open it
            // todo: change to some welcome screen url
            activity.intent.data = null
            // complete hook on response
            APLogger.info(TAG, "Successful login")
            showSuccessScreen(activity, ks, listener)
        } catch (e: Exception) {
            showErrorScreen(activity, e.message!!)
            // do not finish the hook
        }
    }

    @WorkerThread
    fun urlRegistration(uri: Uri, uuid: String): String {
        // extract information
        val json = fetchUrl(uri.toString())
        val jo = JSONObject(json)
        val verifyUserUrl = jo.getString("verifyUserUrl")
        val contractId = jo.getString("contractId")

        val kalturaAPI = KalturaFlows.makeKalturaAPI(kalturaAPIEndpoint)

        // send to Kaltura and get response
        val session = KalturaFlows.login(kalturaAPI, contractId, verifyUserUrl, uuid, partnerId)

        if (null == session) {
            throw RuntimeException("Failed to obtain session")
        }

        // todo: store (good for a week)
        val sessionKS = session.ks!!

        // todo: store (needed to renew ks)
        val addAppToken = KalturaFlows.addAppToken(kalturaAPI, sessionKS)

        return sessionKS
    }

    @WorkerThread
    fun loginPasswordRegistration(username: String, password: String, uuid: String): String {
        val kalturaAPI = KalturaFlows.makeKalturaAPI(kalturaAPIEndpoint)

        val session = KalturaFlows.login(kalturaAPI, username, password, uuid, partnerId)
            ?: throw RuntimeException("Failed to obtain session")

        // todo: store (good for a week)
        val sessionKS = session.ks!!

        // todo: store (needed to renew ks)
        val appToken = KalturaFlows.addAppToken(kalturaAPI, sessionKS)

        KalturaFlows.renewKS(kalturaAPI, appToken, uuid, partnerId)

        return sessionKS
    }

    private fun showSuccessScreen(
        activity: Activity,
        message: String,
        listener: HookListener
    ) {
        activity.runOnUiThread {
            AlertDialog.Builder(activity)
                .setTitle(message)
                .setPositiveButton(android.R.string.ok) { _, _ -> listener.onHookFinished() }
                .show()
        }
    }

    private fun showErrorScreen(
        activity: Activity,
        message: String
    ) {
        APLogger.error(TAG, message)
        activity.runOnUiThread {
            AlertDialog.Builder(activity)
                .setTitle(message)
                .setPositiveButton(android.R.string.ok) { _, _ -> activity.finish() }
                .show()
        }
    }

    override fun setPluginModel(plugin: Plugin) {
        val config = plugin.getConfiguration()

        // Partner ID
        config["kaltura_partner_id"].let {
            if (null == it || !it.isJsonPrimitive) {
                APLogger.error(
                    TAG,
                    "Required plugin configuration parameter 'kaltura_partner_id' is missing or invalid"
                )
                return@let
            }
            partnerId = it.asLong // will do string->long cast if needed
        }

        // Kaltura endpoint
        config["kaltura_api_endpoint"].let {
            if (null == it || !it.isJsonPrimitive) {
                APLogger.error(
                    TAG,
                    "Required plugin configuration parameter 'kaltura_api_endpoint' is missing or not string"
                )
                return@let
            }
            kalturaAPIEndpoint = it.asString
            if (kalturaAPIEndpoint.isEmpty()) {
                APLogger.error(
                    TAG,
                    "Required plugin configuration parameter 'kaltura_api_endpoint' has empty value, setting to default"
                )
                kalturaAPIEndpoint = KalturaFlows.KalturaEndpoint
            } else if (!kalturaAPIEndpoint.endsWith("/")) {
                kalturaAPIEndpoint += "/" // OkHttp requires base url to end with "/"
            }
        }
    }

    override fun setPluginConfigurationParams(params: MutableMap<Any?, Any?>?) {
        // deprecated
    }

    override fun executeOnApplicationReady(context: Context, listener: HookListener) {
        listener.onHookFinished()
    }

    override fun executeOnStartup(context: Context, listener: HookListener) {
        val activity = context as? Activity
        if (null == activity) {
            // will not happen
            APLogger.error(TAG, "Non-Activity context passed to hook")
            listener.onHookFinished()
            return
        }

        val uri = activity.intent.data
        if (null == uri) {
            showErrorScreen(activity, "Intent url is missing")
            return
        }

        if (!uri.toString().startsWith(URLMask)) {
            showErrorScreen(activity, "Intent missing or incorrect")
            return // do not finish the hook
        }

        val uuid = UUIDUtil.getUUID()

        GlobalScope.launch(Dispatchers.IO) {
            runInitialFlow(activity, uri, listener, uuid)
        }
    }

    companion object {

        private const val TAG = "QuickLineAuth"

        //todo: add better URL complience check
        private const val URLMask =
            "https://canary-preprod.qltv.quickline.ch/login/v001/chmedia/trustedLogin"

        private const val KalturaOTTUrl = "https://3223.frs1.ott.kaltura.com/"

        private fun fetchUrl(url: String): String {
            (URL(url).openConnection() as HttpURLConnection).apply {
                requestMethod = "POST"
                connect()
                inputStream.bufferedReader().use {
                    return it.readText()
                }
            }
        }
    }

}
