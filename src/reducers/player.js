/**
 * Created by hyc on 17-1-1.
 */
import * as actionTypes from '../constants/actionTypes'
import { isSameById } from '../utils/player'

const initialState = {
  activeTrackId: null
  , isPlaying: false
  , playlist: []
}

function setTrackInPlaylist(state, trackId) {
  const item = state.playlist.some(isSameById(trackId))
  // const item = state.get('playlist').find(isSameById(track))

  if (item) return state
  const playlist = [...state.playlist, trackId]
  return Object.assign({}, state, { playlist })
}

function removeTrackFromPlaylist(state, trackId) {
  // return state.updateIn(['playlist'], list => list.remove(list.indexOf(track)))
  const index = state.playlist.findIndex(isSameById(trackId))
  const playlist = [...state.playlist.slice(0, index), ...state.playlist.slice(index + 1)]
  return Object.assign({}, state, { playlist })
}
function deactivateTrack(state) {
  return Object.assign({}, state, { activeTrackId: null })
}
function setPlaylist(state, playlist: []) {
  return Object.assign({}, state, { playlist })
}
export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_IS_PLAYING:
      return Object.assign({}, state, { isPlaying: action.isPlaying })
    case actionTypes.SET_ACTIVE_TRACK:
      return Object.assign({}, state, { activeTrackId: action.activeTrackId })
    case actionTypes.SET_TRACK_IN_PLAYLIST:
      return setTrackInPlaylist(state, action.trackId)

    case actionTypes.REMOVE_TRACK_FROM_PLAYLIST:
      return removeTrackFromPlaylist(state, action.trackId)

    case actionTypes.DEACTIVE_TRACK:
      return deactivateTrack(state)

    case actionTypes.SET_PLAY_LIST:
      return setPlaylist(state, action.playlist)
    default:
      return state
  }
}
