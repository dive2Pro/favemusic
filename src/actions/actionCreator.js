/**
 * Created by hyc on 16-12-31.
 */
import { init, login, logout } from './auth'
import { togglePlaylist } from './environment'
import { fetchActivities, fetchFollowersF, fetchFavoritesF, fetchFollowingsF } from './user'
import { fetchActivitiesByGenre } from './browse'
import { likeF } from './track'
import {
  togglePlayTrack, activeIterateTrack,
  activateTrackF, removeTrackFromPlaylistF, addTrackToPlaylistF
} from './player'

export {
  init
  , login
  , logout
  , fetchActivities
  , fetchFollowersF
  , fetchFavoritesF
  , fetchFollowingsF
  , togglePlayTrack
  , activateTrackF
  , togglePlaylist
  , addTrackToPlaylistF
  , activeIterateTrack
  , removeTrackFromPlaylistF
  , fetchActivitiesByGenre
  , likeF
}
