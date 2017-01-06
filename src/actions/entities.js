// @flow
import { MERGE_USER_ENTITIES, MERGE_TRACK_ENTITIES } from '../constants/actionTypes'
export function mergeUserEntities(users: []) {
  return {
    type: MERGE_USER_ENTITIES
    , users
  }
}

export function mergeTrackEntities(tracks: []) {
  return {
    type: MERGE_TRACK_ENTITIES
    , tracks
  }
}

