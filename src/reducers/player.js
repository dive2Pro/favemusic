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

const setTrackInPlaylist = (state, trackId) => {
  const item = state.playlist.some(isSameById(trackId))
  // const item = state.get('playlist').find(isSameById(track))

  if (item) return state
  const playlist = [...state.playlist, trackId]
  return { ...state, playlist }
}

const removeTrackFromPlaylist = (state, trackId) => {
  // return state.updateIn(['playlist'], list => list.remove(list.indexOf(track)))
  const index = state.playlist.findIndex(isSameById(trackId))
  const playlist = [...state.playlist.slice(0, index), ...state.playlist.slice(index + 1)]
  return { ...state, playlist }
}
const deactivateTrack = (state) => {
  return { ...state, activeTrackId: null }
}

const resetPlaylist = (state) => {
  return { ...state, playlist: [] }
}
export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_IS_PLAYING:
      return { ...state, isPlaying: action.isPlaying }
    case actionTypes.SET_ACTIVE_TRACK:
      return { ...state, activeTrackId: action.activeTrackId }
    case actionTypes.SET_TRACK_IN_PLAYLIST:
      return setTrackInPlaylist(state, action.trackId)

    case actionTypes.REMOVE_TRACK_FROM_PLAYLIST:
      return removeTrackFromPlaylist(state, action.trackId)

    case actionTypes.DEACTIVE_TRACK:
      return deactivateTrack(state)

    case actionTypes.RESET_PLAYLIST:
      return resetPlaylist(state)
    default:
      return state
  }
}
