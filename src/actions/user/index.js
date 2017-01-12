import apiUrl, { addAccessToken, getLazyLoadingUrl } from '../../services/soundcloundApi'
import Cookies from 'js-cookie'
import * as actionTypes from '../../constants/actionTypes'
import { OAUTH_TOKEN } from '../../constants/authentification'
import { wrapInOrigin, addIdFromOrigin } from '../../services/track'
import { setRequestTypeInProcess } from '../request/index'
import * as requestTypes from '../../constants/requestTypes'
import * as paginateLinkTypes from '../../constants/paginateLinkTypes'
import { setPaginateLink } from '../paginate/index'
import { userSchema } from '../../schemas/user'
import { songSchema } from '../../schemas/song'
import { normalize, schema } from 'normalizr'
import { mergeUserEntities, mergeTrackEntities, mergeSongEntities } from '../entities/index'


export const mergeFollowings = (followings) => ({
  type: actionTypes.MERGE_FOLLOWINGS
  , followings
})


export const mergeActivities = (activities) => ({
  type: actionTypes.MERGE_ACTIVITIES
  , activities
})


export const mergeFollowers = (followers) => ({
  type: actionTypes.MERGE_FOLLOWERS
  , followers
})

const mergeFavorites = (favorites) => ({
  type: actionTypes.MERGE_FAVORITES
  , favorites
})


export const fetchFollowersF = (user, nextHref) => {
  const accessToken = Cookies.get(OAUTH_TOKEN)
  const initHref = `followers?limit=20&offset=0&oauth_token=${accessToken}`
  const followersUrl = getLazyLoadingUrl(user, nextHref, initHref)

  return (dispatch, getState) => {
    const request = getState().request
    const isrequestFollowersInProcess = request[requestTypes.FOLLOWERS]
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

export const fetchFollowingsF = (user, nextHref) =>
  (dispatch, getState) => {
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
        dispatch(mergeUserEntities(normaObj.entities.users))
        dispatch(mergeFollowings(normaObj.result))

        dispatch(setRequestTypeInProcess(false, requestTypes.FOLLOWINGS))
        dispatch(setPaginateLink(data.nextHref, paginateLinkTypes.FOLLOWINGS))
      })
  }


export const fetchActivities = (nextHref) => {
  let activitiesUrl
  if (nextHref) {
    activitiesUrl = addAccessToken(nextHref, '&')
  } else {
    activitiesUrl = apiUrl(`me/activities?limit=50&offset=0`, '&')
  }

  return (dispatch, getState) => {
    const activitiesRequestInProcess = getState().request[requestTypes.ACTIVITIES]
    if (activitiesRequestInProcess) {
      return;
    }
    console.info('activitiesUrl = ', activitiesUrl)
    dispatch(setRequestTypeInProcess(true, requestTypes.ACTIVITIES))

    return fetch(activitiesUrl)
      .then(response => response.json())
      .then(data => {
        const t_data = data.collection.map(addIdFromOrigin)
        console.info('t_data= ', t_data);
        const normalizedObj = normalize(t_data, new schema.Array(songSchema))
        console.info('normalizedObj = ', normalizedObj)
        dispatch(mergeSongEntities(normalizedObj.entities.songs))
        dispatch(mergeTrackEntities(normalizedObj.entities.origins))
        dispatch(mergeUserEntities(normalizedObj.entities.users))
        dispatch(mergeActivities(normalizedObj.result))

        dispatch(setPaginateLink(data.next_href, paginateLinkTypes.ACTIVITIES))
        dispatch(setRequestTypeInProcess(false, requestTypes.ACTIVITIES))
      })
      .catch(() => {
        dispatch(setRequestTypeInProcess(false, requestTypes.ACTIVITIES))
      })
  }
}

export const fetchFavoritesF = (user, nextHref) =>
  (dispatch, getState) => {
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
        console.info('data = ', data);
        const normalizedObj = normalize(data.map(wrapInOrigin), new schema.Array(songSchema))
        dispatch(mergeTrackEntities(normalizedObj.entities.origins))
        dispatch(mergeFavorites(normalizedObj.result))
        dispatch(setPaginateLink(data.next_href, paginateLinkTypes.FAVORITES))
        dispatch(setRequestTypeInProcess(false, requestTypes.FAVORITES))
      })
      .catch(() => {
        dispatch(setRequestTypeInProcess(false, requestTypes.FAVORITES))
      })
  }
