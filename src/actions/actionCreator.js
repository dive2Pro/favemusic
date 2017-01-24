/**
 * Created by hyc on 16-12-31.
 */
import { toggleFollowingF } from './following/index'
import { init, login, logout } from './auth/index'
import { setToggledF, setDeepToggledF } from './toggle/index'
import {
  fetchActivities,
  fetchFollowersF,
  fetchFavoritesF,
  fetchFollowingsF
} from './user/index'
import { fetchActivitiesByGenre } from './browse/index'
import { likeF } from './track/index'
import { fetchCommentByIdF } from './comment/index'
import {
  togglePlayTrack, activeIterateTrack,
  activateTrackF, removeTrackFromPlaylistF, addTrackToPlaylistF
  , clearPlayListF
} from './player/index'
import { filterByDuration } from './filter/index'
import { sortByTypeF } from './sort/index'

export {
  init
  , login
  , logout
  , fetchActivities
  , fetchCommentByIdF
  , fetchFollowersF
  , fetchFavoritesF
  , fetchFollowingsF
  , togglePlayTrack
  , activateTrackF
  , setToggledF
  , setDeepToggledF
  , addTrackToPlaylistF
  , activeIterateTrack
  , removeTrackFromPlaylistF
  , fetchActivitiesByGenre
  , likeF
  , clearPlayListF
  , toggleFollowingF
  , filterByDuration
  , sortByTypeF
}
