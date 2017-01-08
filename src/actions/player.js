/**
 * Created by hyc on 17-1-1.
 */
import * as actionTypes from '../constants/actionTypes'
import { isSameTrackAndPlaying, isSameById } from '../utils/player'
import { syncEntities } from './entities'
<<<<<<< HEAD
import { resetToggledF } from './toggle'
import { PLAYLISTTYPE } from '../constants/toggleTypes'
=======
>>>>>>> c459912811d112ade1e4e729ab7782b6c7137b1e
const setIsPlaying = (isPlaying) => ({
  type: actionTypes.SET_IS_PLAYING
  , isPlaying
})

const setActiveTrack = (activeTrackId) => ({
  type: actionTypes.SET_ACTIVE_TRACK
  , activeTrackId
})

const setTrackInPlaylist = (trackId) => ({
  type: actionTypes.SET_TRACK_IN_PLAYLIST
  , trackId
})


const removeFromPlaylist = (trackId) => ({
  type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST
  , trackId
})

/** TODO neba  */

const deactivateTrack = () => ({
  type: actionTypes.DEACTIVE_TRACK
})


const getIterateTrackId = (playlist, activeTrackId, iterate) => {
<<<<<<< HEAD
  const index = playlist.findIndex(isSameById(activeTrackId))
=======
  const index = playlist.findIndex(isSameTrack(activeTrackId))
>>>>>>> c459912811d112ade1e4e729ab7782b6c7137b1e
  const iterateTrackId = playlist[(index + iterate)]
  return iterateTrackId
}

export const togglePlayTrack = (isPlaying) =>
  dispatch => {
    dispatch(setIsPlaying(isPlaying))
  }


export const activateTrackF = (trackId) =>
  (dispatch, getState) => {
    const player = getState().player
      , preActiveTrackId = player.activeTrackId
      , isPlaying = player.isPlaying
    console.info(player, '---', isPlaying)
    const isAPT = isSameTrackAndPlaying(preActiveTrackId, trackId, isPlaying)
    console.info('isAPT = ', isAPT)
    dispatch(togglePlayTrack(!isAPT))
    dispatch(setActiveTrack(trackId))
    dispatch(setTrackInPlaylist(trackId))
  }


export const addTrackToPlaylistF = (trackId) =>
  (dispath, getState) => {
    const size = getState().player.playlist.length
    if (!size) {
      dispath(setActiveTrack(trackId))
    }
    dispath(setTrackInPlaylist(trackId))
  }


export const activeIterateTrack = (activeTrackId, iterate = 1) =>
  (dispatch, getState) => {
    const player = getState().player
      , tracks = getState().entities.tracks
    const playlist = player.playlist
    const iterateTrackId = getIterateTrackId(playlist, activeTrackId, iterate)
      , activeTrack = tracks[activeTrackId]
    if (iterateTrackId) {
      dispatch(setActiveTrack(iterateTrackId))
      togglePlayTrack(true)
    } else {
      dispatch(togglePlayTrack(false))
    }

    dispatch(syncEntities(activeTrack, 'tracks'))
  }

export const removeTrackFromPlaylistF = (trackId) =>
  (dispatch, getState) => {
    const player = getState().player
    const preActiveTrackId = player.activeTrackId
    const isAPT = isSameById(preActiveTrackId)(trackId)

    if (isAPT) {
      dispatch(activeIterateTrack(preActiveTrackId))
    }
    // if only one track deactivateTrack
    const playlist = player.playlist
    const playlistSize = playlist.length
    if (playlistSize < 2) {
      dispatch(deactivateTrack())
      dispatch(resetToggledF(PLAYLISTTYPE))
    }
    dispatch(removeFromPlaylist(trackId))
  }
/**
 *  const setPlaylist = (playlist: []) => ({
 * type: actionTypes.SET_PLAY_LIST
 * , playlist})
 */

const resetPlaylist = () => ({
  type: actionTypes.RESET_PLAYLIST
})


const setPlaylist = (playlist: []) => ({
  type: actionTypes.SET_PLAY_LIST
  , playlist
})


export const clearPlayListF = () =>
  dispatch => {
    dispatch(togglePlayTrack(false))
    dispatch(deactivateTrack())
    dispatch(resetPlaylist())
    dispatch(resetToggledF(PLAYLISTTYPE))
  }

