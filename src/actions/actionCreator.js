/**
 * Created by hyc on 16-12-31.
 */
import { init, login,logout } from './auth'
import { togglePlaylist } from './environment'
import { fetchActivities, fetchFollowers } from './user'
import {
  togglePlayTrack, activeIterateTrack,
  activateTrack, removeTrackFromPlaylist, addTrackToPlaylist
} from './player'

export {
  init,
  login,
  logout,
  fetchActivities,
  fetchFollowers,
  togglePlayTrack,
  activateTrack,
  togglePlaylist,
  addTrackToPlaylist,
  activeIterateTrack,
  removeTrackFromPlaylist
}
