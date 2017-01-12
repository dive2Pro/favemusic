// @flow
import { unauthApiUrl } from '../../services/soundcloundApi'
import * as actionTypes from '../../constants/actionTypes'
import { wrapInOrigin } from '../../services/track'
import { setRequestTypeInProcess } from '../request/index'
import { setPaginateLink } from '../paginate/index'
import * as requestTypes from '../../constants/requestTypes'
import { mergeTrackEntities, mergeSongEntities, mergeUserEntities } from '../entities/index'
import { normalize, schema } from 'normalizr'
import { songSchema } from '../../constants/schema'

const mergeActivitiesByGenre = (activitiesIds: Array<Number>, genre: 'foo') =>
  ({
    type: actionTypes.MERGE_ACTIVITIES_BY_GENRE
    , activitiesIds
    , genre
  })


export const fetchActivitiesByGenre = (nextHref: string, genre: string = 'house') => {
  return (dispatch: () => void, getState: () => Object) => {
    const initHref = unauthApiUrl(
      `tracks?linked_partitioning=1&limit=50&offset=0&tags=${genre.toLocaleLowerCase()}`, '&')
    const url = nextHref || initHref
    const requestInprocess = getState().request[requestTypes.ACTIVITIES_BYGENRE]
    if (requestInprocess) {
      return;
    }
    dispatch(setRequestTypeInProcess(true, requestTypes.ACTIVITIES_BYGENRE))
    return fetch(url)
      .then((response: ResponseType) => response.json())
      .then((data: ResponseAfterToJSONType) => {
        console.info(data);
        const normalizedObj = normalize(data.collection.map(wrapInOrigin)
          , new schema.Array(songSchema))
        dispatch(mergeTrackEntities(normalizedObj.entities.origins))
        dispatch(mergeSongEntities(normalizedObj.entities.songs))
        dispatch(mergeUserEntities(normalizedObj.entities.users))
        dispatch(mergeActivitiesByGenre(normalizedObj.result, genre))
        dispatch(setPaginateLink(data.next_href, genre))
        dispatch(setRequestTypeInProcess(false, requestTypes.ACTIVITIES_BYGENRE))
      })
  }
}
