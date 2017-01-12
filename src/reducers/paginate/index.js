// @flow
import {
  SET_PAGINATE_LINK,
  SET_DEEP_PAGINATE_LINK
} from '../../constants/actionTypes'
const initialState = {}

function setPaginateLink(state: {}, nextHref: string, paginateLink: string) {
  const paginateObject = {}
  paginateObject[paginateLink] = nextHref
  return { ...state, ...paginateObject }
}

const setDeepPaginateLink = (state: {}, paginateType: string, nextHref: string, trackId: string) => {
  const paginateObject = state[paginateType] || {}
  paginateObject[trackId] = nextHref
  return { ...state, [paginateType]: paginateObject }
}

export default function paginate(state: {} = initialState, action: PaginateActionType) {
  switch (action.type) {
    case SET_PAGINATE_LINK:
      return setPaginateLink(state, action.nextHref, action.paginateLink)
    case SET_DEEP_PAGINATE_LINK:
      return setDeepPaginateLink(state, action.paginateType, action.nextHref, action.trackId)
    default:
      return state
  }
}
