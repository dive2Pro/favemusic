// @flow
import { unauthApiUrl } from '../utils/soundcloundApi'
import * as actionTypes from '../constants/actionTypes'
import { wrapInOrigin } from '../utils/track'
import { setRequestTypeInProcess } from './request'
import { setPaginateLink } from './paginate'
import * as requestTypes from '../constants/requestTypes'

function mergeActivitiesByGenre(activities: Array<*>) {
  return {
    type: actionTypes.MERGE_ACTIVITIES_BY_GENRE
    , activities
  }
}

export function fetchActivitiesByGenre(nextHref: string, genre: string) {
  return (dispatch: ()=>void, getState: ()=>Object) => {
    const initHref = unauthApiUrl(
      `tracks?linked_partitioning=1&limit=50&offset=0&tags=${genre}`, '&')
    const url = nextHref || initHref
    const requestInprocess = getState().request.requestObject[requestTypes.ACTIVITIES_BYGENRE]
    if (requestInprocess) {
      return;
    }
    dispatch(setRequestTypeInProcess(true, requestTypes.ACTIVITIES_BYGENRE))
    return fetch(url)
      .then((response: ResponseType) => response.json())
      .then((data: ResponseAfterToJSONType) => {
        const activities = data.collection.map(wrapInOrigin)
        dispatch(mergeActivitiesByGenre(activities))
        dispatch(setPaginateLink(data.next_href, genre))
        dispatch(setRequestTypeInProcess(false, requestTypes.ACTIVITIES_BYGENRE))
      })
  }
}
