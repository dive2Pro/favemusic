// @flow
import { } from '../../constants/schema'
import { MERGE_USER_ENTITIES, MERGE_TRACK_ENTITIES, MERGE_SONGS_ENTITIES, SYNC_ENTITEIS } from '../../constants/actionTypes'

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

function syncEntiteis(state: {}, activeTrack: {}, key: "foo") {
  const objs = state[key]
  const newObjs = Object.assign({}, objs, { [activeTrack.id]: activeTrack })
  return { ...state, [key]: newObjs }
}

export default function (state: {} = initialState, action: Action) {
  switch (action.type) {
    case MERGE_USER_ENTITIES:
      return mergeUserEntities(state, action.users)
    case MERGE_TRACK_ENTITIES:
      return mergeTrackEntities(state, action.tracks)
    case MERGE_SONGS_ENTITIES:
      return mergeSongsEntities(state, action.songs)
    case SYNC_ENTITEIS:
      return syncEntiteis(state, action.activeTrack, action.key)
    default: return state
  }
}
