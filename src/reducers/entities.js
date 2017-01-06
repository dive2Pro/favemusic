// @flow
import { } from '../constants/schema'
import { MERGE_USER_ENTITIES, MERGE_TRACK_ENTITIES } from '../constants/actionTypes'

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
}
function mergeTrackEntities(state: {}, mergeTracks: {}) {
  const tracks = {
    ...state.tracks
    , ...mergeTracks
  }
  return { ...state, tracks }
}

export default function (state: {} = initialState, action: Action) {
  switch (action.type) {
    case MERGE_USER_ENTITIES:
      return mergeUserEntities(state, action.users)
    case MERGE_TRACK_ENTITIES:
      return mergeTrackEntities(state, action.tracks)
    default: return state
  }
}
