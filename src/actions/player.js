/**
 * Created by hyc on 17-1-1.
 */
import * as actionTypes from '../constants/actionTypes'
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player'
import { togglePlaylist } from './environment'
function setIsPlaying(isPlaying) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    isPlaying
  }
}

function setActiveTrack(activeTrack) {
  return {
    type: actionTypes.SET_ACTIVE_TRACK,
    activeTrack
  }
}
function setTrackInPlaylist(track) {
  return {
    type: actionTypes.SET_TRACK_IN_PLAYLIST,
    track
  }
}

function removeFromPlaylist(track) {
  return {
    type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST,
    track
  }
}

function deactivateTrack() {
  return {
    type: actionTypes.DEACTIVE_TRACK
  }
}

function getIterateTrack(playlist, activeTrack, iterate) {
  const index = playlist.findIndex(isSameTrack(activeTrack))
  const iterateTrack = playlist[(index + iterate)]
  return iterateTrack
}

export function togglePlayTrack(isPlaying) {
  return dispatch => {
    dispatch(setIsPlaying(isPlaying))
  }
}

export function activateTrack(track) {
  return (dispatch, getState) => {
    const player = getState().player,
      preActiveTrack = player.activeTrack,
      isPlaying = player.isPlaying
    console.info(player, '---', isPlaying)
    const isAPT = isSameTrackAndPlaying(preActiveTrack, track, isPlaying)
    console.info('isAPT = ', isAPT)
    dispatch(togglePlayTrack(!isAPT))
    dispatch(setActiveTrack(track))
    dispatch(setTrackInPlaylist(track))
  }
}

export function addTrackToPlaylist(track) {
  return (dispath, getState) => {
    const size = getState().player.playlist.length
    if (!size) {
      dispath(setActiveTrack(track))
    }
    dispath(setTrackInPlaylist(track))
  }
}

export function activeIterateTrack(activeTrack, iterate = 1) {
  return (dispatch, getState) => {
    const player = getState().player

    const playlist = player.playlist
    const iterateTrack = getIterateTrack(playlist, activeTrack, iterate)

    if (iterateTrack) {
      dispatch(setActiveTrack(iterateTrack))
      togglePlayTrack(true)
    } else {
      dispatch(togglePlayTrack(false))
    }
  }
}

export function removeTrackFromPlaylist(track) {
  return (dispatch, getState) => {
    const player = getState().player
    const preActiveTrack = player.activeTrack
    const isAPT = isSameTrack(preActiveTrack)(track)

    if (isAPT) {
      dispatch(activeIterateTrack(preActiveTrack))
    }
    // if only one track deactivateTrack
    const playlist = player.playlist
    const playlistSize = playlist.length
    if (playlistSize < 2) {
      dispatch(deactivateTrack())
      dispatch(togglePlaylist(true))
    }
    dispatch(removeFromPlaylist(track))
  }
}

