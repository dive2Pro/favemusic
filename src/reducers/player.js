/**
 * Created by hyc on 17-1-1.
 */
import { Map } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
const initialState = Map({
  activeTrack: null,
  isPlaying: false
})

export default function (state = initialState, action) {
  switch ( action.type ) {
    case actionTypes.SET_IS_PLAYING:
      return state.set('isPlaying', action.isPlaying)
    case actionTypes.SET_ACTIVE_TRACK:
      return state.set('activeTrack', action.activeTrack)
    default:
      return state
  }
}