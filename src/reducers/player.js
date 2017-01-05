/**
 * Created by hyc on 17-1-1.
 */
import * as actionTypes from '../constants/actionTypes'
import { isSameTrack } from '../utils/player'

const initialState = {
  activeTrack: null
  , isPlaying: false
  , playlist: []
}

function setTrackInPlaylist(state, track) {
  const item = state.playlist.some(isSameTrack(track))
  // const item = state.get('playlist').find(isSameTrack(track))

  if (item) return state
  const playlist = [...state.playlist, track]
  return Object.assign({}, state, { playlist })
}

function removeTrackFromPlaylist(state, track) {
  // return state.updateIn(['playlist'], list => list.remove(list.indexOf(track)))
  const index = state.playlist.findIndex(isSameTrack(track))
  const playlist = [...state.playlist.slice(0, index), ...state.playlist.slice(index + 1)]
  return Object.assign({}, state, { playlist })
}
function deactivateTrack(state) {
  return Object.assign({}, state, { activeTrack: null })
}

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_IS_PLAYING:
      return Object.assign({}, state, { isPlaying: action.isPlaying })
    case actionTypes.SET_ACTIVE_TRACK:
      return Object.assign({}, state, { activeTrack: action.activeTrack })
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
