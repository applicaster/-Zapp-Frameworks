
@import AVFoundation;
@import UIKit;
/**
 Basic keys - You may override them with your delegate with your delegate.
 */

extern NSString *const kAPStreamSenseManagerProgramTitle;    // Default is item's name.
extern NSString *const kAPStreamSenseManagerPlaylistTitle;   // Default is showName.
extern NSString *const kAPStreamSenseManagerWatchPercentage; // The item's completion percantage, 0 for live.
extern NSString *const kPublisherName; //publisher name
extern NSString *const kC3; //c3

/**
 CurrentItem's info Keys - The item's info can be extracted from the given dictionary with this keys
*/
extern NSString *kAPStreamSenseManagerItemID;
extern NSString *kAPStreamSenseManagerItemName;
extern NSString *kAPStreamSenseManagerItemUrl;

static NSString *const kPlayingItemUniqueID = @"id";
static NSString *const kPlayingItemName = @"title";
static NSString *const kPlayingItemContent = @"content";
static NSString *const kPlayingItemSource = @"src";
static NSString *const kPlayingItemUrl = @"url";

// --------------------------------------- APStreamSenseManagerDelegate --------------------------------------- //

@protocol APStreamSenseManagerDelegate <NSObject>

- (AVPlayer *)getCurrentPlayerInstance;
@end

@interface APStreamSenseManager : NSObject

#pragma mark - Public Methods

- (instancetype)initWithProviderProperties:(NSDictionary *)providerProperties
                                  delegate:(id<APStreamSenseManagerDelegate>)delegate;
- (void)playerDidCreate;
- (void)playerDidStartPlayItem:(NSDictionary *)playerObject;
- (void)playerDidPausePlayItem;
- (void)playerDidResumePlayItem;
- (void)playerDidBufferPlayItem;
- (void)playerDidFinishPlayItem;

@end
