import { Map } from 'immutable'
import * as actionTypes from '../constants/actionTypes';
const initialState = Map({
  isOpenPlaylist: true
})

function setIsOpenPlaylist(state, isOpen) {
  return state.set('isOpenPlaylist', isOpen)
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_IS_OPEN_PLAYLIST:
    default: setIsOpenPlaylist(state, action.isOpen)
      return state
  }
}
