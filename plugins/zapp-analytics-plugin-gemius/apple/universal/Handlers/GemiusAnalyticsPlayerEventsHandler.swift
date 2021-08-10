//
//  GemiusAnalyticsPlayerEventsHandler.swift
//  ZappAnalyticsPluginGemius
//
//  Created by Alex Zchut on 10/08/2021.
//

import Foundation
import ZappCore
import GemiusSDK

class GemiusAnalyticsPlayerEventsHandler: AnalyticsPlayerEventsHandler {
    var playbackStalled: Bool = false
    let playerId = "GemiusAnalytics"
    
    var gemiusPlayerObject: GSMPlayer? {
        get {
            return self.delegate?.externalObject as? GSMPlayer
        }
        set (newValue) {
            self.delegate?.externalObject = newValue
        }
    }
    
    lazy var scriptIdentifier: String = {
        guard let value = self.delegate?.configurationJSON?[GemiusAnalyticsProviderParams.scriptIdentifier] as? String else {
            return ""
        }
        return value
    }()
    
    lazy var hitCollectorHost: String = {
        guard let value = self.delegate?.configurationJSON?[GemiusAnalyticsProviderParams.hitCollectorHost] as? String else {
            return ""
        }
        return value
    }()
    
    struct GemiusCustomParams {
        static let sc = "_SC"
        static let sct = "_SCT"
        static let scd = "_SCD"
    }

    fileprivate var skipKeys: [String] {
        return [
            "video_subtype",
            "video_type",
            GemiusCustomParams.sc,
            GemiusCustomParams.scd,
            GemiusCustomParams.sct,
        ]
    }
    
    func getCurrentPlayerPosition(from parameters: [String: Any]?) -> Double {
        return parameters?["offset"] as? Double ?? 0.00
    }
    
    override func handleCreateEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleCreateEvent(eventName, parameters: parameters) == false else {
            return true
        }

        guard var itemData = itemData else {
            return false
        }
        
        let data = GSMProgramData()
        data.name = itemData.title
        data.duration = NSNumber(value: itemData.duration)


        if let jsonString = parameters?["analyticsCustomProperties"] as? String,
           let jsonData = jsonString.data(using: String.Encoding.utf8),
           let jsonDictionary = try? JSONSerialization.jsonObject(with: jsonData, options: []) as? [String: AnyObject] {
            for (key, value) in jsonDictionary {
                switch key {
                case GemiusCustomParams.sc:
                    // update id
                    if let value = jsonDictionary[key] as? String {
                        itemData.id = value
                    }
                case GemiusCustomParams.sct:
                    // update name
                    if let value = jsonDictionary[key] as? String {
                        data.name = value
                    }
                case GemiusCustomParams.scd:
                    // update duration
                    if let value = jsonDictionary[key] as? Int {
                        data.duration = NSNumber(value: value)
                    }
                default:
                    break
                }

                if skipKeys.contains(key) == false {
                    data.addCustomParameter(key, value: "\(value)")
                }
            }
        }

        // set program type
        data.programType = .VIDEO

        gemiusPlayerObject = GSMPlayer(id: playerId,
                                       withHost: hitCollectorHost,
                                       withGemiusID: scriptIdentifier,
                                       with: nil)

        // set program data
        gemiusPlayerObject?.newProgram(itemData.id, with: data)

        return proceedEvent(eventName)
    }

    override func handleSeekingEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleSeekingEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let currentPlayerPosition = getCurrentPlayerPosition(from: parameters)
        gemiusPlayerObject?.program(.SEEK,
                                    forProgram: itemData?.id,
                                    atOffset: NSNumber(value: currentPlayerPosition),
                                    with: nil)
        return proceedEvent(eventName)
    }
    
    override func handleBufferEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleBufferEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let currentPlayerPosition = getCurrentPlayerPosition(from: parameters)
        gemiusPlayerObject?.program(.BUFFER,
                                    forProgram: itemData?.id,
                                    atOffset: NSNumber(value: currentPlayerPosition),
                                    with: nil)
        return proceedEvent(eventName)
    }

    override func handlePauseEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handlePauseEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let currentPlayerPosition = getCurrentPlayerPosition(from: parameters)
        gemiusPlayerObject?.program(.PAUSE,
                                    forProgram: itemData?.id,
                                    atOffset: NSNumber(value: currentPlayerPosition),
                                    with: nil)
        return proceedEvent(eventName)
    }

    override func handlePlayEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handlePlayEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let currentPlayerPosition = getCurrentPlayerPosition(from: parameters)
        gemiusPlayerObject?.program(.PLAY,
                                    forProgram: itemData?.id,
                                    atOffset: NSNumber(value: currentPlayerPosition),
                                    with: nil)
        return proceedEvent(eventName)
    }

    override func handleEndedEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleEndedEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let currentPlayerPosition = getCurrentPlayerPosition(from: parameters)
        gemiusPlayerObject?.program(.COMPLETE,
                                    forProgram: itemData?.id,
                                    atOffset: NSNumber(value: currentPlayerPosition),
                                    with: nil)
        return proceedEvent(eventName)
    }

    override func handleDismissEvent(_ eventName: String, parameters: [String : Any]?) -> Bool {
        guard super.handleDismissEvent(eventName, parameters: parameters) == false else {
            return true
        }

        let currentPlayerPosition = getCurrentPlayerPosition(from: parameters)
        gemiusPlayerObject?.program(.CLOSE,
                                    forProgram: itemData?.id,
                                    atOffset: NSNumber(value: currentPlayerPosition),
                                    with: nil)
        return true
    }
}
