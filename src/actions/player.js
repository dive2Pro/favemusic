/**
 * Created by hyc on 17-1-1.
 */
import * as actionTypes from '../constants/actionTypes'
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player'
import { togglePlaylist } from './environment'
import { syncEntities } from './entities'
function setIsPlaying(isPlaying) {
  return {
    type: actionTypes.SET_IS_PLAYING
    , isPlaying
  }
}

function setActiveTrack(activeTrackId) {
  return {
    type: actionTypes.SET_ACTIVE_TRACK
    , activeTrackId
  }
}
function setTrackInPlaylist(trackId) {
  return {
    type: actionTypes.SET_TRACK_IN_PLAYLIST
    , trackId
  }
}

function removeFromPlaylist(trackId) {
  return {
    type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST
    , trackId
  }
}

/** TODO neba  */

function deactivateTrack() {
  return {
    type: actionTypes.DEACTIVE_TRACK
  }
}

function getIterateTrackId(playlist, activeTrackId, iterate) {
  const index = playlist.findIndex(isSameTrack(activeTrackId))
  const iterateTrackId = playlist[(index + iterate)]
  return iterateTrackId
}

export function togglePlayTrack(isPlaying) {
  return dispatch => {
    dispatch(setIsPlaying(isPlaying))
  }
}

export function activateTrackF(trackId) {
  return (dispatch, getState) => {
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
}

export function addTrackToPlaylistF(trackId) {
  return (dispath, getState) => {
    const size = getState().player.playlist.length
    if (!size) {
      dispath(setActiveTrack(trackId))
    }
    dispath(setTrackInPlaylist(trackId))
  }
}

export function activeIterateTrack(activeTrackId, iterate = 1) {
  return (dispatch, getState) => {
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
}

export function removeTrackFromPlaylistF(trackId) {
  return (dispatch, getState) => {
    const player = getState().player
    const preActiveTrackId = player.activeTrackId
    const isAPT = isSameTrack(preActiveTrackId)(trackId)

    if (isAPT) {
      dispatch(activeIterateTrack(preActiveTrackId))
    }
    // if only one track deactivateTrack
    const playlist = player.playlist
    const playlistSize = playlist.length
    if (playlistSize < 2) {
      dispatch(deactivateTrack())
      dispatch(togglePlaylist(true))
    }
    dispatch(removeFromPlaylist(trackId))
  }
}

function setPlaylist(playlist: []) {
  return {
    type: actionTypes.SET_PLAY_LIST
    , playlist
  }
}

export function clearPlayListF() {
  return dispatch => {
    dispatch(togglePlayTrack(false))
    dispatch(deactivateTrack())
    dispatch(setPlaylist([]))
    dispatch(togglePlaylist(false))
  }
}
