// @flow
import { SET_USER_MERGE_ENTITIES } from '../constants/actionTypes'
export function mergeUserEntities(users: []) {
  return {
    type: SET_USER_MERGE_ENTITIES
    , users
  }
}
