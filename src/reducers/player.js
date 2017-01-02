/**
 * Created by hyc on 17-1-1.
 */
import { Map, List } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { isSameTrack } from '../utils/player'
const initialState = Map({
  activeTrack: null,
  isPlaying: false,
  playlist: List()
})

function setTrackInPlaylist(state, track) {
  const item = state.get('playlist').find(isSameTrack(track))
  if (item) return state
  return state.updateIn(['playlist'], list => list.push(track))
}

function removeTrackFromPlaylist(state, track) {
  return state.updateIn(['playlist'], list => list.remove(list.indexOf(track)))
}
function deactivateTrack(state) {
  return state.set('activeTrack', null)
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_IS_PLAYING:
      return state.set('isPlaying', action.isPlaying)

    case actionTypes.SET_ACTIVE_TRACK:
      return state.set('activeTrack', action.activeTrack)

    case actionTypes.SET_TRACK_IN_PLAYLIST:
      return setTrackInPlaylist(state, action.track)

    case actionTypes.REMOVE_TRACK_FROM_PLAYLIST:
      return removeTrackFromPlaylist(state, action.track)

    case actionTypes.DEACTIVE_TRACK:
      return deactivateTrack(state)
    default:
      return state
  }
}
