/**
 * Created by hyc on 17-1-1.
 */
import * as actionTypes from '../constants/actionTypes'

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

export function activateTrack (activeTrack) {
  return dispatch => {
    dispatch(togglePlayTrack(true))
    dispatch(setActiveTrack(activeTrack))
  }
}

export function togglePlayTrack (isPlaying) {
  return dispatch => {
    dispatch(setIsPlaying(isPlaying))
  }
}