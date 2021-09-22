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
import com.applicaster.quickline.auth.kaltura.KalturaFlows
import com.applicaster.quickline.auth.ui.AuthErrorActivity
import com.applicaster.storage.LocalStorage
import com.applicaster.util.APLogger
import com.google.gson.JsonSyntaxException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL


class QuickLineAuth : ApplicationLoaderHookUpI, GenericPluginI {

    // todo: remove default values
    private var partnerId: Long = 3223L
    private var kalturaAPIEndpoint: String = KalturaFlows.KalturaEndpoint

    @WorkerThread
    private fun testLogin(
        activity: Activity,
        listener: HookListener,
        username: String,
        password: String,
        uuid: String
    ) {
        try {
            loginPasswordRegistration(username, password, uuid)
            activity.intent.data = null
            listener.onHookFinished()
        } catch (e: Exception) {
            showErrorScreen(activity, "test login failed", e)
        }
    }

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
            showErrorScreen(activity, e.message!!, e)
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
        val extras = mapOf(
            "auth" to mapOf(
                "objectType" to "KalturaStringValue",
                "value" to "QuickLineSso"
            )
        )
        // send to Kaltura and get response, verifyUserUrl is used as password
        return loginPasswordRegistration(contractId, verifyUserUrl, uuid, extras)
    }

    @WorkerThread
    fun loginPasswordRegistration(
        username: String,
        password: String,
        uuid: String,
        extras: Map<String, Any>? = null
    ): String {
        val kalturaAPI = KalturaFlows.makeKalturaAPI(kalturaAPIEndpoint)

        val session = KalturaFlows.login(kalturaAPI, username, password, uuid, partnerId, extras)
            ?: throw RuntimeException("Failed to obtain session")

        // ks is good for a week
        val sessionKS = session.ks!!
        LocalStorage.set(KEY_KS, sessionKS, PluginId)

        // needed to renew ks
        val appToken = KalturaFlows.addAppToken(kalturaAPI, sessionKS)
        LocalStorage.storeObject(KEY_APP_TOKEN, appToken, PluginId)

        // uncomment for testing
        // KalturaFlows.renewKS(kalturaAPI, appToken, uuid, partnerId)

        return sessionKS
    }

    private fun tryRenew(
        activity: Activity,
        listener: HookListener,
        errorMessage: String,
        uuid: String
    ) {
        try {
            val appToken = LocalStorage.restoreObject(
                KEY_APP_TOKEN,
                KalturaFlows.AppToken::class.java,
                PluginId
            )
            if (null == appToken) {
                showErrorScreen(activity, errorMessage)
                return
            }
            GlobalScope.launch(Dispatchers.IO) {
                val kalturaAPI = KalturaFlows.makeKalturaAPI(kalturaAPIEndpoint)
                val ks = KalturaFlows.renewKS(kalturaAPI, appToken, uuid, partnerId)
                if (null != ks) {
                    LocalStorage.set(KEY_KS, ks, PluginId)
                    listener.onHookFinished()
                } else {
                    showErrorScreen(activity, "Failed to renew KS")
                }
            }
        } catch (e: JsonSyntaxException) {
            // broken or incompatible token
            LocalStorage.remove(KEY_APP_TOKEN, PluginId)
            showErrorScreen(activity, "Failed to deserialize appToken", e)
        } catch (e: Exception) {
            // do not remove token, can be network error
            // todo: handle different errors
            showErrorScreen(activity, "Failed to renew KS", e)
        }
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
        message: String,
        e: Exception? = null
    ) {
        APLogger.error(TAG, message, e)
        activity.runOnUiThread {
            AuthErrorActivity.show(activity,message, e?.message ?: "")
            activity.finish() // make sure to finish main activity
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
        // todo: check if values has changed, then rerun the flows if needed
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
        APLogger.info(TAG, "Intent url $uri")

        val uuid = UUIDUtil.getUUID()

        if (null == uri) {
            tryRenew(activity, listener, "Intent url is missing", uuid)
            return // do not finish the hook
        }

        if (uri.toString().startsWith(TestURLMask)) {
            GlobalScope.launch(Dispatchers.IO) {
                val username = uri.getQueryParameter("username")
                val password = uri.getQueryParameter("password")
                val uuid = uri.getQueryParameter("uuid")
                if(null != username && null != password && null != uuid) {
                    testLogin(activity, listener, username, password, uuid)
                }
            }
            return
        }

        if (!uri.toString().startsWith(URLMask)) {
            tryRenew(activity, listener, "Intent uri is incorrect", uuid)
            return // do not finish the hook
        }

        GlobalScope.launch(Dispatchers.IO) {
            runInitialFlow(activity, uri, listener, uuid)
        }
    }

    companion object {

        private const val TAG = "QuickLineAuth"
        private const val PluginId = "quickline-kaltura-authentication"

        private const val KEY_APP_TOKEN = "appToken"
        private const val KEY_KS = "ks"

        //todo: add better URL compliance check
        private const val URLMask =
            "https://canary-preprod.qltv.quickline.ch/login/v001/chmedia/trustedLogin"

        private const val TestURLMask = "oneplus://testLogin"

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
