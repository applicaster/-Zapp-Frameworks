//
//  UserInterfaceLayerDependantPluginsSubManager+LoadingStateMachineDataSource.swift
//  ZappApple
//
//  Created by Alex Zchut on 21/07/2021.
//

import Foundation

extension UserInterfaceLayerDependantPluginsSubManager: LoadingStateMachineDataSource {
    
    func prepareLoadingUserInterfaceLayerDependantPluginStates() -> [LoadingState] {
        let storage = LoadingState()
        storage.stateHandler = prepareGeneralStoragePlugins
        storage.readableName = "<plugins-state-machine> Prepare General Storage plugins"

        return [storage]
    }

    public func stateMachineFinishedWork(with state: LoadingStateTypes) {
        userInterfaceLayerDependantPluginsLoaderCompletion?(state == .success)
        userInterfaceLayerDependantPluginsLoaderCompletion = nil
    }
}
