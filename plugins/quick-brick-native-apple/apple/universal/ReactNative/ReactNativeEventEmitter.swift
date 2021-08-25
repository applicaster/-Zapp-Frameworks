//
//  ReactNativeEventEmitter.swift
//  QuickBrickApple
//
//  Created by Pawel Buderaski on 24/08/2021.
//

import Foundation
import React

@objc(ReactNativeEventEmitter)
open class ReactNativeEventEmitter: RCTEventEmitter {
  public static var emitter: RCTEventEmitter!
  
  public static func orientationChange(orientation: Int) {
    emitter.sendEvent(withName: "orientationChange", body: ["toOrientation": orientation])
  }
  
  override init() {
      super.init()
      ReactNativeEventEmitter.emitter = self
  }
  
  override open func supportedEvents() -> [String] {
      return ["orientationChange"]
  }
  
  override public class func requiresMainQueueSetup() -> Bool {
      return true
  }
}
