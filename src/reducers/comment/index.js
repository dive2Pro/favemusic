/**
 * Created by hyc on 17-1-12.
 */
import {
  MERGE_COMMENTS_OF_ID,
  SET_COMMENTS_REQUEST_NEXT_HREF_BY_ID
} from '../../constants/actionTypes'
const initialState = {}

const mergeCommentsById = (state, receivedId, receivedComments) => {
  const id = state[receivedId] || {}
  const preComments = id.commentsIds ? id.commentsIds : {}
  id.commentsIds = [...preComments, ...receivedComments]
  console.log(id)
  return { ...state, [receivedId]: id }
}

const setCommentsRequestNextHrefById = (state, receivedId, receivedNextHref) => {
  const id = state[receivedId] || {}
  id.nextHref = receivedNextHref
  return { ...state, [receivedId]: id }
}

const commentOpe = (state = initialState, action) => {
  switch (action.type) {
    case MERGE_COMMENTS_OF_ID:
      return mergeCommentsById(state, action.trackId, action.commentsIds)
    case SET_COMMENTS_REQUEST_NEXT_HREF_BY_ID:
      return setCommentsRequestNextHrefById(state, action.trackId, action.nextHref)
    default:
      return state
  }
}
export default commentOpe
