/**
 * Created by hyc on 16-12-31.
 */
import apiUrl, { addAccessToken, getLazyLoadingUrl } from '../utils/soundcloundApi'
import Cookies from 'js-cookie'
import * as actionTypes from '../constants/actionTypes'
import { OAUTH_TOKEN } from '../constants/authentification'
import { wrapInOrigin } from '../utils/track'
import { setRequestTypeInProcess } from './request'
import * as requestTypes from '../constants/requestTypes'
import * as paginateLinkTypes from '../constants/paginateLinkTypes'
import { setPaginateLink } from './paginate'
import { userSchema } from '../constants/schema'
import { normalize, schema } from 'normalizr'
import { mergeUserEntities } from './userEntities'
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

export function fetchFollowersF(user, nextHref) {
  const accessToken = Cookies.get(OAUTH_TOKEN)
  const initHref = `followers?limit=20&offset=0&oauth_token=${accessToken}`
  const followersUrl = getLazyLoadingUrl(user, nextHref, initHref)

  return (dispatch, getState) => {
    const request = getState().request
    const isrequestFollowersInProcess = request.requestObject[requestTypes.FOLLOWERS]
    if (isrequestFollowersInProcess) return

    dispatch(setRequestTypeInProcess(true, requestTypes.FOLLOWERS))

    return fetch(followersUrl)
      .then(response => response.json())
      .then(data => {
        // tree shaker
        const normaObj = normalize(data.collection, new schema.Array(userSchema))
        console.info(normaObj);
        dispatch(mergeUserEntities(normaObj.entities.users))
        // only ids
        dispatch(mergeFollowers(normaObj.result))

        dispatch(setRequestTypeInProcess(false, requestTypes.FOLLOWERS))

        if (data.nextHref) {
          console.log(data.nextHref);
          dispatch(setPaginateLink(data.nextHref, paginateLinkTypes.FOLLOWERS))
        }
      })
      .catch(() => {
        dispatch(setRequestTypeInProcess(false, requestTypes.FOLLOWERS))
      })
  }
}

export function fetchFollowingsF(user, nextHref) {
  return (dispatch, getState) => {
    const accessToken = Cookies.get(OAUTH_TOKEN)
    const initHref = `followings?limit=20&offset=0&oauth_token=${accessToken}`
    const followingsUrl = getLazyLoadingUrl(user, nextHref, initHref)
    const requestInProcess = getState().request[requestTypes.FOLLOWINGS]
    if (requestInProcess) return ""
    dispatch(setRequestTypeInProcess(true, requestTypes.FOLLOWINGS))
    return fetch(followingsUrl)
      .then(response => response.json())
      .then(data => {
        const normaObj = normalize(data.collection, new schema.Array(userSchema))
        dispatch(mergeFollowings(normaObj.result))
        dispatch(mergeUserEntities(normaObj.entities.users))

        dispatch(setRequestTypeInProcess(false, requestTypes.FOLLOWINGS))
        dispatch(setPaginateLink(data.nextHref, paginateLinkTypes.FOLLOWINGS))
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
    const activitiesRequestInProcess = getState().request.requestObject[requestTypes.ACTIVITIES]
    if (activitiesRequestInProcess) {
      return;
    }
    console.info('activitiesUrl = ', activitiesUrl)
    dispatch(setRequestTypeInProcess(true, requestTypes.ACTIVITIES))

    return fetch(activitiesUrl)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeActivities(data.collection))
        dispatch(setPaginateLink(data.next_href, paginateLinkTypes.ACTIVITIES))
        dispatch(setRequestTypeInProcess(false, requestTypes.ACTIVITIES))
      })
      .catch(() => {
        dispatch(setRequestTypeInProcess(false, requestTypes.ACTIVITIES))
      })
  }
}

export function fetchFavoritesF(user, nextHref) {
  return (dispatch, getState) => {
    const favoritesRequestInProcess = getState().request[requestTypes.FAVORITES]
    if (favoritesRequestInProcess) {
      return;
    }
    const favoritesUrl = getLazyLoadingUrl(user, nextHref, 'favorites?limit=20&offset=0')
    dispatch(setRequestTypeInProcess(true, requestTypes.FAVORITES))
    return fetch(favoritesUrl)
      .then(response => {
        console.info(response);
        return response.json()
      })
      .then(data => {
        dispatch(mergeFavorites(data.map(wrapInOrigin)))
        dispatch(setPaginateLink(data.next_href, paginateLinkTypes.FAVORITES))
        dispatch(setRequestTypeInProcess(false, requestTypes.FAVORITES))
      })
      .catch(() => {
        dispatch(setRequestTypeInProcess(false, requestTypes.FAVORITES))
      })
  }
}
