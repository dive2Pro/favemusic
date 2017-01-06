// @flow
import { } from '../constants/schema'
import { MERGE_USER_ENTITIES, MERGE_TRACK_ENTITIES, MERGE_SONGS_ENTITIES } from '../constants/actionTypes'

function mergeUserEntities(state: {}, mergeUsers: []) {
  const users = {
    ...state.users
    , ...mergeUsers
  }
  return { ...state, users }
}

const initialState = {
  users: {}
  , tracks: {}
  , songs: {}
}
function mergeTrackEntities(state: {}, mergeTracks: {}) {
  const tracks = {
    ...state.tracks
    , ...mergeTracks
  }
  return { ...state, tracks }
}


function mergeSongsEntities(state: {}, mergeSongs: {}) {
  const songs = {
    ...state.songs
    , ...mergeSongs
  }
  return { ...state, songs }
}

export default function (state: {} = initialState, action: Action) {
  switch (action.type) {
    case MERGE_USER_ENTITIES:
      return mergeUserEntities(state, action.users)
    case MERGE_TRACK_ENTITIES:
      return mergeTrackEntities(state, action.tracks)
    case MERGE_SONGS_ENTITIES:
      return mergeSongsEntities(state, action.songs)
    default: return state
  }
}
