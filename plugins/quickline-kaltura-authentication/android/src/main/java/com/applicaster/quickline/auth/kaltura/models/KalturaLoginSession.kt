package com.applicaster.quickline.auth.kaltura.models

import com.applicaster.quickline.auth.kaltura.IKalturaAPI

data class LoginRequest(
    val partnerId: Long,
    val username: String,
    val password: String,
    val uuid: String,
    val extraParams: Map<String, Any>? = null,
    val apiVersion: String = IKalturaAPI.API_VERSION,
)

data class LoginResponse(
    val executionTime: Double?,
    val result: KalturaLoginResponse?
)

data class KalturaLoginResponse(
    val objectType: String?,
    val loginSession: KalturaLoginSession?,
    var user: KalturaUser?,
    val error: IKalturaAPI.KAPIError?
)

data class AnonymousLoginRequest(
    val partnerId: Long,
    val apiVersion: String = IKalturaAPI.API_VERSION
)

data class AnonymousLoginResponse(
    val executionTime: Double?,
    val result: KalturaLoginSession?
)

data class KalturaLoginSession(
    var objectType: String?,
    var expiry: Long?,
    var ks: String?,
    var refreshToken: String?
)
