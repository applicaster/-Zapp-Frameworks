package com.applicaster.quickline.auth

import android.app.Activity
import android.content.Context
import android.net.Uri
import androidx.annotation.WorkerThread
import androidx.appcompat.app.AlertDialog
import com.applicaster.identityservice.UUIDUtil
import com.applicaster.plugin_manager.hook.ApplicationLoaderHookUpI
import com.applicaster.plugin_manager.hook.HookListener
import com.applicaster.quickline.auth.kaltura.KalturaFlows
import com.applicaster.util.APLogger
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL


class QuickLineAuth : ApplicationLoaderHookUpI {

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

        val kalturaAPI = KalturaFlows.makeKalturaAPI()

        // send to Kaltura and get response
        val session = KalturaFlows.login(kalturaAPI, contractId, verifyUserUrl, uuid)

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
        val kalturaAPI = KalturaFlows.makeKalturaAPI()

        val session = KalturaFlows.login(kalturaAPI, username, password, uuid)
            ?: throw RuntimeException("Failed to obtain session")

        // todo: store (good for a week)
        val sessionKS = session.ks!!

        // todo: store (needed to renew ks)
        val appToken = KalturaFlows.addAppToken(kalturaAPI, sessionKS)

        KalturaFlows.renewKS(kalturaAPI, appToken, uuid)

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

    override fun setPluginConfigurationParams(params: MutableMap<Any?, Any?>?) {

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

        //todo: better URL check
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
