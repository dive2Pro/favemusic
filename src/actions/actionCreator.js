/**
 * Created by hyc on 16-12-31.
 */
import { toggleFollowingF } from './following/index'
import { init, login, logout } from './auth/index'
import { setToggledF } from './toggle/index'
import { fetchActivities, fetchFollowersF, fetchFavoritesF, fetchFollowingsF } from './user/index'
import { fetchActivitiesByGenre } from './browse/index'
import { likeF } from './track/index'
import {
  togglePlayTrack, activeIterateTrack,
  activateTrackF, removeTrackFromPlaylistF, addTrackToPlaylistF
  , clearPlayListF
} from './player/index'

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
