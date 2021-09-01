//
//  UIDeviceOrientation+Extension.swift
//  QuickBrickApple
//
//  Created by Anton Kononenko on 8/30/21.
//  Copyright © 2021 Anton Kononenko. All rights reserved.
//

import Foundation
import React

extension UIDeviceOrientation {
    func mapOrientation() -> Int {
        var orientation = 0

        switch self {
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
