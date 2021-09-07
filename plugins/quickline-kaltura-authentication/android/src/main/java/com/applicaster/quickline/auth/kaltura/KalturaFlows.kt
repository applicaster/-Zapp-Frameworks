package com.applicaster.quickline.auth.kaltura

import androidx.annotation.WorkerThread
import com.applicaster.quickline.auth.kaltura.models.*
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.security.MessageDigest

object KalturaFlows {

    data class AppToken(val id: String, val token: String)

    @WorkerThread
    fun login(
        kalturaAPI: IKalturaAPI,
        username: String,
        password: String,
        uuid: String,
        partnerId: Long
    ): KalturaLoginSession? {
        val loginResponse = kalturaAPI.loginOTT(
            LoginRequest(
                partnerId,
                username,
                password,
                uuid
            )
        ).execute()

        if (!loginResponse.isSuccessful) {
            throw Exception(loginResponse.errorBody().toString())
        }

        val loginResponseBody = loginResponse.body()
        loginResponseBody?.result?.error?.let {
            val msg = it.message ?: it.toString()
            throw Exception(msg)
        }
        return loginResponseBody?.result?.loginSession
    }

    @WorkerThread
    fun addAppToken(
        kalturaAPI: IKalturaAPI,
        sessionKS: String
    ): AppToken {
        val tokenResponse = kalturaAPI.appTokenAdd(TokenRequest(sessionKS)).execute()
        if (!tokenResponse.isSuccessful) {
            throw Exception(tokenResponse.errorBody().toString())
        }

        tokenResponse.body()?.result?.let {
            if (null == it.id) throw RuntimeException("id is missing in AppToken")
            if (null == it.token) throw RuntimeException("token is missing in AppToken")
            return AppToken(it.id, it.token)
        }

        // todo: better error handling
        throw RuntimeException("Failed to add AppToken")
    }

    @WorkerThread
    fun renewKS(
        kalturaAPI: IKalturaAPI,
        appToken: AppToken,
        uuid: String,
        partnerId: Long
    ): String? {
        val loginResponse = kalturaAPI.loginOTTAnonymous(AnonymousLoginRequest(partnerId)).execute()
        if (!loginResponse.isSuccessful) {
            throw Exception(loginResponse.errorBody().toString())
        }

        val loginResponseBody = loginResponse.body()

        val loginSession = loginResponseBody?.result
            ?: throw Exception("No login session received")

        val anonKs = loginSession.ks!!

        val hashToken = hashToken(appToken.token, anonKs)
        val sessionResponse = kalturaAPI.appTokenStartSession(
            StartSessionRequest(
                anonKs,
                appToken.id,
                hashToken,
                uuid
            )
        ).execute()
        if (!sessionResponse.isSuccessful) {
            throw Exception(sessionResponse.errorBody().toString())
        }
        // todo: handle error
        return sessionResponse.body()?.result?.ks
    }


    fun makeKalturaAPI(endpoint: String): IKalturaAPI =
        Retrofit.Builder()
            .addConverterFactory(GsonConverterFactory.create())
            .baseUrl(endpoint)
            .build()
            .create(IKalturaAPI::class.java)

    private fun hashToken(token: String, ks: String): String = sha256(ks + token)

    private fun sha256(base: String): String {
        val digest: MessageDigest = MessageDigest.getInstance("SHA-256")
        val hash: ByteArray = digest.digest(base.toByteArray(charset("UTF-8")))
        return hash.joinToString("") { "%02x".format(it) }
    }

    const val KalturaEndpoint = "https://api.frs1.ott.kaltura.com/api_v3/"
}
