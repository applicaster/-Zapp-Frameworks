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
  
  public static func orientationChange(toOrientation: UIDeviceOrientation) {
    var orientation = 0
    
    switch toOrientation{
      case .portrait:
        orientation = 1
      case .landscapeRight:
        orientation = 2
      case .landscapeLeft:
        orientation = 4
      case .portraitUpsideDown:
        orientation = 8
      default:
        orientation = 0
    }
    
    if(orientation != 0) {
      emitter.sendEvent(withName: "orientationChange", body: ["toOrientation": orientation])
    }
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
