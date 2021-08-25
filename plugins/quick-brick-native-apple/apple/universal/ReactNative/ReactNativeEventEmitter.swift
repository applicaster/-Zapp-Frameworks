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
  
  public static func orientationChange(toOrientation: UIDeviceOrientation, fromOrientation: UIDeviceOrientation) {
    if (toOrientation.rawValue > 0 && fromOrientation.rawValue > 0) {
      emitter.sendEvent(withName: "orientationChange", body: ["toOrientation": toOrientation.mapOrientation(), "fromOrientation": fromOrientation.mapOrientation()])
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

extension UIDeviceOrientation {
  func mapOrientation() -> Int {
    var orientation = 0
    
    switch self{
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
    
    return orientation
  }
}
