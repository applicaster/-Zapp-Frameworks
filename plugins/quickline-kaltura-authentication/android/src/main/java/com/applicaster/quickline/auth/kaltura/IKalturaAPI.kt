package com.applicaster.quickline.auth.kaltura

import com.applicaster.quickline.auth.kaltura.models.*
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface IKalturaAPI {

    data class KAPIError(
        val code: String?,
        val message: String?,
        val objectType: String
    )

    @POST("service/ottuser/action/login")
    fun loginOTT(@Body login: LoginRequest): Call<LoginResponse>

    @POST("service/ottuser/action/anonymousLogin")
    fun loginOTTAnonymous(@Body login: AnonymousLoginRequest): Call<AnonymousLoginResponse>

    @POST("service/appToken/action/add")
    fun appTokenAdd(@Body request: TokenRequest): Call<TokenResponse>

    @POST("service/appToken/action/startSession")
    fun appTokenStartSession(@Body request: StartSessionRequest): Call<KalturaSessionInfoResponse>

    companion object {
        const val API_VERSION = "6.5.0.29184"
        const val partnerId = 3223 // todo: move it from here
        val defaultAppTokenRequest = mapOf(
            "objectType" to "KalturaAppToken",
            "sessionDuration" to "86400",
            "hashType" to "SHA256"
        )
    }
}
