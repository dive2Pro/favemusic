import { getLazyLoadingCommentUrl } from '../../services/soundcloundApi'
import { commentSchema } from '../../schemas/comments'
import { COMMENTS } from '../../constants/requestTypes'
import { normalize, schema } from 'normalizr'
import {
  MERGE_COMMENTS_OF_ID
} from '../../constants/actionTypes'
import { setRequestTypeInProcess } from '../request/index'
import { mergeCommentEntities, mergeUserEntities } from '../entities/index'
import { setDeepPaginateLink } from '../paginate/index'

const mergeCommentsById = (commentsIds, trackId) => ({
  type: MERGE_COMMENTS_OF_ID
  , commentsIds
  , trackId
})
const fetchCommentById = (trackId) => {
  return (dispatch, getState) => {
    const isRequestInprocess = getState().request[COMMENTS] && getState().request[COMMENTS][trackId]
    if (isRequestInprocess) return
    dispatch(setRequestTypeInProcess(true, COMMENTS))
    const nextHref = getState().comment[trackId].nextHref
    const initHref = `tracks/${trackId}/comments?linked_partitioning=1&limit=20&offset=0`
    const url = getLazyLoadingCommentUrl(nextHref, initHref)
    const promise = fetch(url)
    return promise().then(response => response.json())
      .then(data => {
        dispatch(setDeepPaginateLink(data.next_href, trackId, COMMENTS))
        const normalizedObj = normalize(data.collecion, new schema.Array(commentSchema))
        dispatch(mergeCommentsById(normalizedObj.result, trackId))
        dispatch(mergeCommentEntities(normalizedObj.entities.comments))
        dispatch(mergeUserEntities(normalizedObj.entities.users))
        dispatch(setRequestTypeInProcess(false, COMMENTS))
      })
      .catch(() => {
        dispatch(setRequestTypeInProcess(false, COMMENTS))
      })
  }
}

export { fetchCommentById }
