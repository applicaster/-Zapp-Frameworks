package com.applicaster.quickline.auth.kaltura.models

data class KalturaUser(
    var objectType: String?,
    var firstName: String?,
    var id: String?,
    var lastName: String?,
    var username: String?,
    var address: String?,
    var affiliateCode: String?,
    var city: String?,
    var countryId: Int?,
    var createDate: Int?,
    var dynamicData: DynamicData?,
    var email: String?,
    var externalId: String?,
    var facebookId: String?,
    var facebookImage: String?,
    var facebookToken: String?,
    var failedLoginCount: Int?,
    var householdId: Int?,
    var isHouseholdMaster: Boolean?,
    var lastLoginDate: Int?,
    var phone: String?,
    var roleIds: String?,
    var suspensionState: String?,
    var updateDate: Int?,
    var userState: String?,
    var userType: UserType?,
    var zip: String?
)

data class DynamicData(
    var RefCount: RefCount?
)

data class UserType(
    var objectType: String?,
    var description: String?
)

data class RefCount(
    var objectType: String?,
    var value: String?
)