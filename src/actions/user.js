/**
 * Created by hyc on 16-12-31.
 */
import apiUrl, { addAccessToken } from '../utils/soundcloundApi'
import Cookies from 'js-cookie'
import * as actionTypes from '../constants/actionTypes'
import { OAUTH_TOKEN } from '../constants/authentification'
function mergeFollowings (followings) {
  return {
    type: actionTypes.MERGE_FOLLOWINGS,
    followings
  }
}

function mergeActivities (activities) {
  return {
    type: actionTypes.MERGE_ACTIVITIES,
    activities
  }
}

function setActivitiesNextHref (nextHref) {
  return {
    type: actionTypes.SET_ACTIVITIES_REQUEST_NEXT_HREF,
    nextHref
  }
}
function setActivitiesRequestInProcess (inProcess) {
  return {
    type: actionTypes.SET_ACTIVITIES_REQUEST_IN_PROCESS,
    inProcess
  }
}

export function fetchFollowings (user, nextHref) {
  const accessToken = Cookies.get(OAUTH_TOKEN)
  const initHref = `//api.soundcloud.com/users/${user.id}/followings?limit=200&offset=0&oauth_token=${accessToken}`
  const followingsUrl = nextHref || initHref

  return dispatch => {
    return fetch(followingsUrl)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeFollowings(data.collection))

        if (data.nextHref) {
          console.info(data.nextHref)
        }
      })
  }
}

export function fetchActivities (nextHref) {
  let activitiesUrl
  if (nextHref) {
    activitiesUrl = addAccessToken(nextHref)
  } else {
    activitiesUrl = apiUrl(`me/activities?limit=50&offset=0`)
  }

  return (dispatch, getState) => {
    const activitiesRequestInProcess = getState().user.get('activitiesRequestInProcess')
    if (activitiesRequestInProcess) {
      return;
    }
    console.info('activitiesUrl = ', activitiesUrl)
    dispatch(setActivitiesRequestInProcess(true))

    return fetch(activitiesUrl)
      .then(response => response.json())
      .then(data => {
        console.info(data, ' activities !!!')
        dispatch(mergeActivities(data.collection))
        dispatch(setActivitiesNextHref(data.next_href))
        dispatch(setActivitiesRequestInProcess(false))

      }).catch(err => {

        dispatch(setActivitiesRequestInProcess(false))

      })
  }
}