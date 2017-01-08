// @flow
import * as actionTypes from '../constants/actionTypes';
const initialState = {
  isOpenPlaylist: false
}

function setIsOpenPlaylist(state: Object, isOpenPlaylist: boolean) {
  return { ...state, isOpenPlaylist }
}

export default function (state: Object = initialState, action: boolean) {
  switch (action.type) {
    case actionTypes.SET_IS_OPEN_PLAYLIST:
      return setIsOpenPlaylist(state, action.isOpen)
    default:
      return state
  }
}
