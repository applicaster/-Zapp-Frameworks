package com.applicaster.quickline.auth.ui

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.TextView
import com.applicaster.quickline.kaltura.auth.R

class AuthErrorActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.layout_auth_error)

        val errorMessage = intent.getStringExtra(ARG_ERROR_MESSAGE) ?: ""
        val errorDetails = intent.getStringExtra(ARG_ERROR_DETAILS) ?: ""

        findViewById<TextView>(R.id.lbl_error_message).text = errorMessage
        findViewById<TextView>(R.id.lbl_error_details).text = errorDetails
        findViewById<View>(R.id.btn_close).apply {
            setOnClickListener { finish() }
            requestFocus()
        }
    }

    companion object {

        @JvmStatic
        fun show(activity: Activity, errorMessage: String, errorDetails: String) {
            val intent = Intent(activity, AuthErrorActivity::class.java)
                .putExtra(ARG_ERROR_MESSAGE, errorMessage)
                .putExtra(ARG_ERROR_DETAILS, errorDetails)
            activity.startActivity(intent)
        }

        private const val ARG_ERROR_MESSAGE = "error_message"
        private const val ARG_ERROR_DETAILS = "error_details"
    }
}