package com.applicaster.quickline.auth.kaltura.models

import com.applicaster.quickline.auth.kaltura.IKalturaAPI


data class TokenRequest(
    var ks: String,
    var appToken: Map<String, String>? = IKalturaAPI.defaultAppTokenRequest, // optional
    var apiVersion: String = IKalturaAPI.API_VERSION
)

data class TokenResponse(
    val executionTime: Double?,
    val result: KalturaAppToken?
)

data class KalturaAppToken(
    val objectType: String?,
    val createDate: Int?,
    val expiry: Int?,
    val hashType: String?,
    val id: String?,
    val partnerId: Int?,
    val sessionDuration: Int?,
    val sessionUserId: String?,
    val token: String?,
    val updateDate: Int?
)

data class StartSessionRequest(
    var ks: String?,
    var id: String?,
    var tokenHash: String?,
    var udid: String?,
    var apiVersion: String = IKalturaAPI.API_VERSION
)

data class KalturaSessionInfoResponse(
    val executionTime: Double?,
    val result: KalturaSessionInfo?
)

data class KalturaSessionInfo(
    var objectType: String?,
    var createDate: Long?,
    var expiry: Long?,
    var ks: String?,
    var partnerId: Int?,
    var privileges: String?,
    var udid: String?,
    var userId: String?
)