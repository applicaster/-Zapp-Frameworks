package com.applicaster.quickline.auth

import com.applicaster.storage.LocalStorage
import com.google.gson.Gson

// todo: move to SDK

fun LocalStorage.removeItem(
    key: String,
    namespace: String? = null
) {
    when {
        namespace.isNullOrEmpty() -> remove(key)
        else -> remove(key, namespace)
    }
}

fun LocalStorage.storeString(
    key: String,
    value: String?,
    namespace: String? = null
) {
    when {
        namespace.isNullOrEmpty() -> set(key, value)
        else -> set(key, value, namespace)
    }
}

fun LocalStorage.restoreString(
    key: String,
    namespace: String? = null
): String? = when {
    namespace.isNullOrEmpty() -> get(key)
    else -> get(key, namespace)
}

fun LocalStorage.storeLong(
    key: String,
    value: Long,
    namespace: String? = null
) = storeString(value.toString(), namespace)

fun LocalStorage.restoreLong(
    key: String,
    namespace: String? = null
): Long? = restoreString(key, namespace)?.toLong()

fun LocalStorage.storeObject(
    key: String,
    value: Any?,
    namespace: String? = null
) {
    if (null == value) {
        removeItem(key, namespace)
    } else {
        val json = Gson().toJson(value)
        storeString(json, namespace)
    }
}

fun <T> LocalStorage.restoreObject(
    key: String,
    cls: Class<T>,
    namespace: String? = null
): T? where T : Any? {
    val value = restoreString(key, namespace) ?: return null
    return Gson().fromJson(value, cls)
}
