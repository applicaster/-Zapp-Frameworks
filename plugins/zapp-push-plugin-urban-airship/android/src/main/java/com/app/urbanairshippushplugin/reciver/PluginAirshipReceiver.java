package com.app.urbanairshippushplugin.reciver;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.applicaster.util.APLogger;
import com.applicaster.util.StringUtil;
import com.applicaster.util.push.PushUtil;
import com.urbanairship.actions.DeepLinkListener;
import com.urbanairship.channel.AirshipChannelListener;
import com.urbanairship.push.NotificationActionButtonInfo;
import com.urbanairship.push.NotificationInfo;
import com.urbanairship.push.NotificationListener;
import com.urbanairship.push.PushListener;
import com.urbanairship.push.PushMessage;

/**
 * Created by user on 11/29/16.
 */
public class PluginAirshipReceiver implements PushListener, NotificationListener, AirshipChannelListener {

    private static final String TAG = "PluginAirshipReceiver";
    private final DeepLinkListener mDeepLinkListener = new DeepLinkListener() {
        @Override
        public boolean onDeepLink(@NonNull String s) {
            APLogger.info(TAG, "Got DeepLink: " + s);
            return false; // let UAS handle it in any case
        }
    };

    public PluginAirshipReceiver() {
    }

    @Override
    public void onChannelCreated(@NonNull String channelId) {
        APLogger.info(TAG, "Channel created. Channel Id:" + channelId + ".");
    }

    @Override
    public void onChannelUpdated(@NonNull String channelId) {
        APLogger.info(TAG, "Channel updated. Channel Id:" + channelId + ".");
    }

    @Override
    public void onPushReceived(@NonNull PushMessage message, boolean notificationPosted) {
        APLogger.info(TAG, "Received push message. Alert: " + message.getAlert() + ". posted notification: " + notificationPosted);
    }

    @Override
    public void onNotificationPosted(@NonNull NotificationInfo notificationInfo) {
        APLogger.info(TAG, "Notification posted. Alert: " + notificationInfo.getMessage().getAlert() + ". NotificationId: " + notificationInfo.getNotificationId());
    }

    @Override
    public boolean onNotificationOpened(@NonNull NotificationInfo notificationInfo) {
        APLogger.info(TAG, "Notification opened. Alert: " + notificationInfo.getMessage().getAlert() + ". NotificationId: " + notificationInfo.getNotificationId());
        PushMessage message = notificationInfo.getMessage();
        onTapAnalyticsEvent(message);
        return false;
    }

    @Override
    public boolean onNotificationForegroundAction(@NonNull NotificationInfo notificationInfo,
                                                  @NonNull NotificationActionButtonInfo notificationActionButtonInfo) {
        String buttonId = notificationActionButtonInfo.getButtonId();
        APLogger.info(TAG, "Notification foreground action button opened. Button ID: " + buttonId + ". NotificationId: " + notificationInfo.getNotificationId());
        PushMessage message = notificationInfo.getMessage();
        onTapAnalyticsEvent(message);
        return false;
    }

    @Override
    public void onNotificationBackgroundAction(@NonNull NotificationInfo notificationInfo,
                                               @NonNull NotificationActionButtonInfo notificationActionButtonInfo) {
        PushMessage message = notificationInfo.getMessage();
        String buttonId = notificationActionButtonInfo.getButtonId();
        APLogger.info(TAG, "Notification background action button opened. Button ID: " + buttonId + ". NotificationId: " + notificationInfo.getNotificationId());
        onTapAnalyticsEvent(message);
    }

    private void onTapAnalyticsEvent(PushMessage message){
        String title = message.getAlert();
        String mesg = message.getTitle();
        String messageId = message.getCanonicalPushId();
        String description = message.getSummary();
        String provider = "Urban Airship";
        Intent intent = new Intent();
        PushUtil.updateAnalyticsParams(intent, messageId, StringUtil.isNotEmpty(title), null, provider, mesg, description, title);
        PushUtil.sendNotificationAnalyticsParams(intent);
    }

    @Override
    public void onNotificationDismissed(@NonNull NotificationInfo notificationInfo) {
        APLogger.info(TAG, "Notification dismissed. Alert: " + notificationInfo.getMessage().getAlert() + ". Notification ID: " + notificationInfo.getNotificationId());
    }

    public DeepLinkListener getDeepLinkListener() {
        return mDeepLinkListener;
    }
}