
// @flow
import { SET_PAGINATE_LINK } from '../constants/actionTypes'
const initialState = {
  paginateObject: {}
}

function setPaginateLink(state: {}, nextHref: string, paginateLink: string) {
  const paginateObject = state.paginateObject
  paginateObject[paginateLink] = nextHref
  return Object.assign({}, state, { paginateObject })
}

export default function paginate(state: {} = initialState, action: PaginateActionType) {
  switch (action.type) {
    case SET_PAGINATE_LINK:
      return setPaginateLink(state, action.nextHref, action.paginateLink)
    default:
      return state
  }
}
