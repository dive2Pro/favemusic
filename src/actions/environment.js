import * as actionTypes from '../constants/actionTypes'

export const togglePlaylist = (isOpen) =>
  dispatch =>
    dispatch({
      type: actionTypes.SET_IS_OPEN_PLAYLIST
      , isOpen
    })

