/**
 * Created by hyc on 16-12-31.
 */
import apiUrl, { addAccessToken, getLazyLoadingUrl } from '../utils/soundcloundApi'
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
function mergeFollowers (followers) {

  return {
    type: actionTypes.MERGE_FOLLOWERS,
    followers
  }

}
function setFollowersRequestInProcess (inProcess) {
  return {
    type: actionTypes.SET_FOLLOWERS_REQUEST_IN_PROCESS,
    inProcess
  }
}

function setFollowersRequestNexthref (nextHref) {
  return {
    type: actionTypes.SET_FOLLOWERS_REQUEST_NEXT_HREF,
    nextHref
  }
}
export function fetchFollowers (user, nextHref) {
  const accessToken = Cookies.get(OAUTH_TOKEN)
  const initHref = `followers?limit=50&offset=0&oauth_token=${accessToken}`
  const followersUrl = getLazyLoadingUrl(user, nextHref, initHref)

  return (dispatch, getState) => {
    let userState = getState().user
    const isrequestFollowersInProcess = userState.get('requestFollowersInProcess')
    if (isrequestFollowersInProcess)return

    dispatch(setFollowersRequestInProcess(true))

    return fetch(followersUrl)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeFollowers(data.collection))
        dispatch(setFollowersRequestInProcess(false))

        if (data.nextHref) {
          console.log(data.nextHref);
          dispatch(setFollowersRequestNexthref(data.nextHref))
        }
      }).catch(err => {
        dispatch(setFollowersRequestInProcess(false))
      })
  }
}

export function fetchFollowings (user, nextHref) {
  const accessToken = Cookies.get(OAUTH_TOKEN)
  const initHref = `followings?limit=200&offset=0&oauth_token=${accessToken}`
  const followingsUrl = getLazyLoadingUrl(user, nextHref, initHref)
  return dispatch => {
    return fetch(followingsUrl)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeFollowings(data.collection))

        if (data.nextHref) {
          console.info(data.nextHref)
          dispatch(setActivitiesNextHref(data.nextHref))
        }
      })
  }
}

export function fetchActivities (nextHref) {
  let activitiesUrl
  if (nextHref) {
    activitiesUrl = addAccessToken(nextHref, '&')
  } else {
    activitiesUrl = apiUrl(`me/activities?limit=50&offset=0`,'&')
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
        dispatch(mergeActivities(data.collection))
        dispatch(setActivitiesNextHref(data.next_href))
        dispatch(setActivitiesRequestInProcess(false))

      }).catch(err => {

        dispatch(setActivitiesRequestInProcess(false))

      })
  }
}