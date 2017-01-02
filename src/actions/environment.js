import * as actionTypes from '../constants/actionTypes'


export function togglePlaylist(isOpen) {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_IS_OPEN_PLAYLIST,
      isOpen
    })
  }
}
