/**
 * Created by hyc on 17-1-1.
 */
import * as actionTypes from '../constants/actionTypes'
import { isActivePlayingTrack } from '../utils/player'

function setIsPlaying (isPlaying) {
  return {
    type: actionTypes.SET_IS_PLAYING,
    isPlaying
  }

}
function setActiveTrack (activeTrack) {
  return {
    type: actionTypes.SET_ACTIVE_TRACK,
    activeTrack
  }
}

export function activateTrack (track) {
  return (dispatch, getState) => {
    const player = getState().player
    // check is the same Track
    const preActiveTrack = player.get('activeTrack')
      , isPlaying = player.get('isPlaying')
    const isAPT = isActivePlayingTrack(preActiveTrack, track, isPlaying)
    console.info('isAPT = ', isAPT)
    dispatch(togglePlayTrack(!isAPT))
    dispatch(setActiveTrack(track))
  }
}

export function togglePlayTrack (isPlaying) {
  return dispatch => {
    dispatch(setIsPlaying(isPlaying))
  }
}