//
//  UserInterfaceLayerDependantPluginsSubManager.swift
//  ZappApple
//
//  Created by Alex Zchut on 21/07/2021.
//

import Foundation
import XrayLogger
import ZappCore

public class UserInterfaceLayerDependantPluginsSubManager: NSObject {
    var parentManager: PluginsManager?
    
    init(parent: PluginsManager?) {
        parentManager = parent
    }
    
    lazy var logger = Logger.getLogger(for: UserInterfaceLayerDependantPluginsSubManagerLogs.subsystem)

    var userInterfaceLayerDependantPluginsStateMachine: LoadingStateMachine!
    var userInterfaceLayerDependantPluginsLoaderCompletion: ((_ success: Bool) -> Void)?

    func intializePlugins(completion: @escaping (_ success: Bool) -> Void) {
        logger?.debugLog(template: UserInterfaceLayerDependantPluginsSubManagerLogs.pluginsInitialization)

        userInterfaceLayerDependantPluginsLoaderCompletion = completion
        userInterfaceLayerDependantPluginsStateMachine = LoadingStateMachine(dataSource: self,
                                                  withStates: prepareLoadingUserInterfaceLayerDependantPluginStates())
        userInterfaceLayerDependantPluginsStateMachine.startStatesInvocation()
    }
    
    func prepareGeneralStoragePlugins(_ successHandler: @escaping StateCallBack,
                               _ failHandler: @escaping StateCallBack) {
        logger?.debugLog(template: UserInterfaceLayerDependantPluginsSubManagerLogs.preparingGeneralStoragePlugins)
        parentManager?.generalStorage.prepareManager { success in
            success ? successHandler() : failHandler()
        }
    }
}
