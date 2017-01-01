/**
 * Created by hyc on 16-12-31.
 */
import { init, initSession } from './auth'
import { togglePlaylist } from './environment'
import { fetchActivities } from './user'
import {
  togglePlayTrack, activeIterateTrack,
  activateTrack, removeTrackFromPlaylist, addTrackToPlaylist
} from './player'

export {
  init,
  initSession,
  fetchActivities,
  togglePlayTrack,
  activateTrack,
  togglePlaylist,
  addTrackToPlaylist,
  activeIterateTrack,
  removeTrackFromPlaylist
}
