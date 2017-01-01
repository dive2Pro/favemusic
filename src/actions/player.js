/**
 * Created by hyc on 17-1-1.
 */
import * as actionTypes from '../constants/actionTypes'
import { isActivePlayingTrack } from '../utils/player'
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


export function activateTrack(track) {
  return (dispatch, getState) => {
    const player = getState().player
    // check is the same Track
    const preActiveTrack = player.get('activeTrack')
      , isPlaying = player.get('isPlaying')
    const isAPT = isActivePlayingTrack(preActiveTrack, track, isPlaying)
    // console.info('isAPT = ', isAPT)
    dispatch(togglePlayTrack(!isAPT))
    dispatch(setActiveTrack(track))
    dispatch(setTrackInPlaylist(track))
  }
}

export function togglePlayTrack(isPlaying) {
  return dispatch => {
    dispatch(setIsPlaying(isPlaying))
  }
}

export function removeTrackFromPlaylist(track) {
  return (dispatch, getState) => {
    const player = getState().player
    const preActiveTrack = player.get('activeTrack')
      , isPlaying = player.get('isPlaying')
    const isAPT = isActivePlayingTrack(preActiveTrack, track, isPlaying)

    if (isAPT) {
      dispatch(activeNextTrack(preActiveTrack))
    }
    // if only one track deactivateTrack
    const playlist = player.get('playlist')
    const playlistSize = playlist.size
    if (playlistSize < 2) {
      dispatch(deactivateTrack())
      dispatch(togglePlaylist(true))
    }
    dispatch(removeFromPlaylist(track))
  }
}

export function activeNextTrack(activeTrack) {
  return (dispatch, getState) => {
    const player = getState().player

    const playlist = player.get('playlist')
    const index = playlist.findIndex(obj => obj.origin.id === activeTrack.origin.id)
    const nextTrack = playlist.get(index + 1)
    if (nextTrack) {
      dispatch(setActiveTrack(nextTrack))
    } else {
      dispatch(togglePlayTrack(false))
    }
  }
}