/**
 * Created by hyc on 16-12-31.
 */
import apiUrl, { addAccessToken, getLazyLoadingUrl } from '../utils/soundcloundApi'
import Cookies from 'js-cookie'
import * as actionTypes from '../constants/actionTypes'
import { OAUTH_TOKEN } from '../constants/authentification'

export function setFollowers(followers) {
  return {
    type: actionTypes.SET_FOLLOWERS
    , followers
  }
}

export function setActivities(activities) {
  return {
    type: actionTypes.SET_ACTIVITIES
    , activities
  }
}
export function setFavorites(favorites) {
  return {
    type: actionTypes.SET_FAVORITES
    , favorites
  }
}

export function setFollowings(followings) {
  return {
    type: actionTypes.SET_FOLLOWINGS
    , followings
  }
}

function mergeFollowings(followings) {
  return {
    type: actionTypes.MERGE_FOLLOWINGS
    , followings
  }
}

function mergeActivities(activities) {
  return {
    type: actionTypes.MERGE_ACTIVITIES
    , activities
  }
}

function mergeFollowers(followers) {
  return {
    type: actionTypes.MERGE_FOLLOWERS
    , followers
  }
}
function mergeFavorites(favorites) {
  return {
    type: actionTypes.MERGE_FAVORITES
    , favorites
  }
}

function setFollowersRequestInProcess(inProcess) {
  return {
    type: actionTypes.SET_FOLLOWERS_REQUEST_IN_PROCESS
    , inProcess
  }
}
function setFollowingsRequestInProcess(inProcess) {
  return {
    type: actionTypes.SET_FOLLOWINGS_REQUEST_IN_PROCESS
    , inProcess
  }
}

function setFollowersRequestNexthref(nextHref) {
  return {
    type: actionTypes.SET_FOLLOWERS_REQUEST_NEXT_HREF
    , nextHref
  }
}

function setFollowingsRequestNexthref(nextHref) {
  return {
    type: actionTypes.SET_FOLLOWINGS_REQUEST_NEXT_HREF
    , nextHref
  }
}

export function fetchFollowersF(user, nextHref) {
  const accessToken = Cookies.get(OAUTH_TOKEN)
  const initHref = `followers?limit=20&offset=0&oauth_token=${accessToken}`
  const followersUrl = getLazyLoadingUrl(user, nextHref, initHref)

  return (dispatch, getState) => {
    const userState = getState().user
    const isrequestFollowersInProcess = userState.requestFollowersInProcess
    if (isrequestFollowersInProcess) return

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
      })
      .catch(() => {
        dispatch(setFollowersRequestInProcess(false))
      })
  }
}

function setActivitiesNextHref(nextHref) {
  return {
    type: actionTypes.SET_ACTIVITIES_REQUEST_NEXT_HREF
    , nextHref
  }
}

function setActivitiesRequestInProcess(inProcess) {
  return {
    type: actionTypes.SET_ACTIVITIES_REQUEST_IN_PROCESS
    , inProcess
  }
}

export function fetchFollowingsF(user, nextHref) {
  return (dispatch, getState) => {
    const accessToken = Cookies.get(OAUTH_TOKEN)
    const initHref = `followings?limit=20&offset=0&oauth_token=${accessToken}`
    const followingsUrl = getLazyLoadingUrl(user, nextHref, initHref)
    const requestInProcess = getState().user.favoritesRequestInProcess
    if (requestInProcess) return ""
    dispatch(setFollowingsRequestInProcess(true))
    return fetch(followingsUrl)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeFollowings(data.collection))
        dispatch(setFollowingsRequestInProcess(false))
        dispatch(setFollowingsRequestNexthref(data.nextHref))
      })
  }
}

export function fetchActivities(nextHref) {
  let activitiesUrl
  if (nextHref) {
    activitiesUrl = addAccessToken(nextHref, '&')
  } else {
    activitiesUrl = apiUrl(`me/activities?limit=50&offset=0`, '&')
  }

  return (dispatch, getState) => {
    const activitiesRequestInProcess = getState().user.activitiesRequestInProcess
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
      })
      .catch(() => {
        dispatch(setActivitiesRequestInProcess(false))
      })
  }
}

function setFavoritesNextHref(nextHref) {
  return {
    type: actionTypes.SET_FAVORITES_REQUEST_NEXT_HREF
    , nextHref
  }
}

function setFavoritesRequestInProcess(inProcess) {
  return {
    type: actionTypes.SET_FAVORITES_REQUEST_IN_PROCESS
    , inProcess
  }
}

export function fetchFavoritesF(user, nextHref) {
  return (dispatch, getState) => {
    const favoritesRequestInProcess = getState().user.favoritesRequestInProcess
    if (favoritesRequestInProcess) {
      return;
    }
    const favoritesUrl = getLazyLoadingUrl(user, nextHref, 'favorites?limit=20&offset=0')
    console.info('FavoritesUrl = ', favoritesUrl)
    dispatch(setFavoritesRequestInProcess(true))

    return fetch(favoritesUrl)
      .then(response => response.json())
      .then(data => {
        console.info('data = ', data)
        dispatch(mergeFavorites(data))
        dispatch(setFavoritesRequestInProcess(false))
        dispatch(setFavoritesNextHref(data.next_href))
      })
      .catch(() => {
        dispatch(setFavoritesRequestInProcess(false))
      })
  }
}
