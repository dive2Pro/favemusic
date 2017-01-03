// @flow
import { unauthApiUrl } from '../utils/soundcloundApi'
import * as actionTypes from '../constants/actionTypes'

function setActivitiesByGenreRequestInProcess(inProcess: boolean): BrowseSetInProcessfActionType {
  return {
    type: actionTypes.SET_ACTIVITIES_BY_GENRE_REQUEST_IN_PROCESS,
    inProcess
  }
}

function setActivitiesByGenreNextHref(next_href: string, genre: string): BrowseSetNextHrefActionType {
  return {
    type: actionTypes.SET_ACTIVITIES_BY_GENRE_NEXT_HREF,
    nextHref: next_href,
    genre
  }
}

function mergeActivitiesByGenre(activities: Array): BrowseMergeActionType {
  return {
    type: actionTypes.MERGE_ACTIVITIES_BY_GENRE,
    activities
  }
}

function wrapInOrigin(activity: ActivityType) {
  return {
    origin: activity,
    type: 'track'
  }
}

export function fetchActivitiesByGenre(nextHref: string, genre: string) {
  return (dispatch: ()=>void, getState: ()=>Object) => {
    const initHref = unauthApiUrl(
      `tracks?linked_partitioning=1&limit=50&offset=0&tags=${genre}`, '&')
    const url = nextHref || initHref
    const requestInprocess = getState().browse.get('activitiesByGenreInProcess')
    if (requestInprocess) {
      return;
    }

    setActivitiesByGenreRequestInProcess(true)
    return fetch(url)
      .then((response: ResponseType) => response.json())
      .then((data: ResponseAfterToJSONType) => {
        const activities = data.collection.map(wrapInOrigin)
        dispatch(mergeActivitiesByGenre(activities))
        dispatch(setActivitiesByGenreNextHref(data.next_href, genre))
        dispatch(setActivitiesByGenreRequestInProcess(false))
      })
  }
}
