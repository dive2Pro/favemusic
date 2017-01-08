/**
 * Created by hyc on 16-12-31.
 */
import { toggleFollowingF } from './followings'
import { init, login, logout } from './auth'
import { setToggledF } from './toggle'
import { fetchActivities, fetchFollowersF, fetchFavoritesF, fetchFollowingsF } from './user'
import { fetchActivitiesByGenre } from './browse'
import { likeF } from './track'
import {
  togglePlayTrack, activeIterateTrack,
  activateTrackF, removeTrackFromPlaylistF, addTrackToPlaylistF
  , clearPlayListF
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
  , setToggledF
  , addTrackToPlaylistF
  , activeIterateTrack
  , removeTrackFromPlaylistF
  , fetchActivitiesByGenre
  , likeF
  , clearPlayListF
  , toggleFollowingF
}
