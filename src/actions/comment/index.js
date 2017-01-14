import { getLazyLoadingCommentUrl } from '../../services/soundcloundApi'
import { commentSchema } from '../../schemas/comments'
import { COMMENTS } from '../../constants/requestTypes'
import {
  MERGE_COMMENTS_OF_ID
} from '../../constants/actionTypes'
import { setDeepRequestTypeInProcess } from '../request/index'
import { mergeCommentEntities, mergeUserEntities } from '../entities/index'
import { setDeepPaginateLink } from '../paginate/index'
import { normalize, schema } from 'normalizr'

const mergeCommentsById = (commentsIds, trackId) => ({
  type: MERGE_COMMENTS_OF_ID
  , commentsIds
  , trackId
})
const fetchCommentByIdF = (trackId, nextHref) => {
  return (dispatch, getState) => {
    const isRequestInprocess = getState().request[COMMENTS] && getState().request[COMMENTS][trackId]
    if (isRequestInprocess) return
    dispatch(setDeepRequestTypeInProcess(true, COMMENTS,trackId))
    const initHref = `tracks/${trackId}/comments?linked_partitioning=1&limit=20&offset=0`
    const url = getLazyLoadingCommentUrl(nextHref, initHref)

    return fetch(url)
            .then(response => response.json())
            .then(data => {
              dispatch(setDeepPaginateLink(data.next_href, trackId, COMMENTS,trackId))
              const normalizedObj = normalize(data.collection, new schema.Array(commentSchema))
              dispatch(mergeCommentEntities(normalizedObj.entities.comments))
              dispatch(mergeUserEntities(normalizedObj.entities.users))
              dispatch(mergeCommentsById(normalizedObj.result, trackId))
              dispatch(setDeepRequestTypeInProcess(false, COMMENTS,trackId))
            })
          .catch((err) => {
            console.error(err)
            dispatch(setDeepRequestTypeInProcess(false, COMMENTS,trackId))
          })
  }
}

export { fetchCommentByIdF }
