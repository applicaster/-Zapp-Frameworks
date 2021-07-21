//
//  RootController+FacadeConnectorUILayerViewControllerProtocol.swift
//  ZappApple
//
//  Created by Anton Kononenko on 07/20/2021.
//  Copyright © 2021 Applicaster LTD. All rights reserved.
//

import Foundation
import ZappCore

extension RootController: FacadeConnectorUILayerViewControllerProtocol {
    public func setPrefersHomeIndicatorAutoHidden(autoHidden: Bool) {
        if let qbViewController = userInterfaceLayerViewController as? UILayerViewControllerProtocol {
            qbViewController.homeIndicatorAutoHidden = autoHidden
        }
    }
}
