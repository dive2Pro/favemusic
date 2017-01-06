// @flow
import { } from '../constants/schema'
import { SET_USER_MERGE_ENTITIES } from '../constants/actionTypes'

function mergeUserEntities(state: {}, mergeUsers: []) {
  return [...state, ...mergeUsers]
}

const initialState = {

}
export default function (state: {} = initialState, action: Action) {
  switch (action.type) {
    case SET_USER_MERGE_ENTITIES:
      return mergeUserEntities(state, action.users)
    default: return state
  }
}
