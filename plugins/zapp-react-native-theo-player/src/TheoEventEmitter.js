import {NativeEventEmitter, NativeModules, Platform} from 'react-native';

import { DeviceEventEmitter } from 'react-native'; //android
const { THEOReactNativeEventEmitter, ReactNativeEventEmitterHelper } = NativeModules; //ios + android (ReactNativeEventEmitterHelper android only)
const theoEventEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(THEOReactNativeEventEmitter)  : DeviceEventEmitter;

export default class TheoEventEmitter {

	addListener(eventType, listener) {
		if (Platform.OS === 'android') {
			ReactNativeEventEmitterHelper.registerListenerForEvent(eventType);
		}
		return theoEventEmitter.addListener(eventType, listener);
	}

}