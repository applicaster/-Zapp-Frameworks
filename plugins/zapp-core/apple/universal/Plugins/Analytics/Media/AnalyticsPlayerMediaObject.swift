//
//  AnalyticsPlayerMediaObject.swift
//  ZappCore
//
//  Created by Alex Zchut on 11/08/2021.
//

import Foundation

public struct AnalyticsPlayerMediaObject {
    public let name: String
    public let mediaId: String
    public let duration: Int
    public let streamType: PlayerMediaStreamType
    public let mediaType: PlayerMediaType
    public let playerType: String
    public var videoProperties: PlayerMediaVideoProperties?
    public var audioProperties: PlayerMediaAudioProperties?
    public var progress: Int
    public init(parameters: [String: Any]?) {
        name = parameters?["name"] as? String ?? ""
        mediaId = parameters?["media_id"] as? String ?? ""
        duration = parameters?["duration"] as? Int ?? 0
        progress = parameters?["progress"] as? Int ?? 0
        streamType = PlayerMediaStreamType(rawValue: parameters?["stream_type"] as? String ?? "") ?? .undefined
        mediaType = PlayerMediaType(rawValue: parameters?["media_type"] as? String ?? "") ?? .undefined
        playerType = parameters?["player_type"] as? String ?? ""
        
        switch mediaType {
        case .audio:
            audioProperties = PlayerMediaAudioProperties(parameters: parameters?["audio"] as? [String: Any])
        case .video:
            videoProperties = PlayerMediaVideoProperties(parameters: parameters?["video"] as? [String: Any])
         
        default:
            break
        }
    }
    
    public var completePercentage: Double {
        guard duration > 0 else {
            return 0.0
        }
        return Double(progress)/Double(duration)
    }
}

public enum PlayerMediaStreamType: String {
    case undefined
    case vod
    case live
    case podcast
    case aod
}

public enum PlayerMediaType: String {
    case undefined
    case audio
    case video
}

public struct PlayerMediaVideoProperties {
    public var showName: String
    public var seasonName: String
    public var genre: String
    public var showType: String
    public var rating: String
    public var network: String
    public var streamFormat: String
    
    public init(parameters: [String: Any]?) {
        showName = parameters?["show_name"] as? String ?? ""
        seasonName = parameters?["season_name"] as? String ?? ""
        genre = parameters?["genre"] as? String ?? ""
        showType = parameters?["show_type"] as? String ?? ""
        rating = parameters?["rating"] as? String ?? ""
        network = parameters?["network"] as? String ?? ""
        streamFormat = parameters?["stream_format"] as? String ?? ""
    }
}

public struct PlayerMediaAudioProperties {
    public var artist: String
    public var album: String
    public var label: String
    public var author: String
    public var station: String
    public var publisher: String
    
    public init(parameters: [String: Any]?) {
        artist = parameters?["artist"] as? String ?? ""
        album = parameters?["album"] as? String ?? ""
        label = parameters?["label"] as? String ?? ""
        author = parameters?["author"] as? String ?? ""
        station = parameters?["station"] as? String ?? ""
        publisher = parameters?["publisher"] as? String ?? ""
    }
}
