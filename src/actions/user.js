/**
 * Created by hyc on 16-12-31.
 */
import apiUrl from '../utils/soundcloundApi'
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

export function fetchActivities (user) {

  const activitiesUrl = apiUrl(`me/activities?limit=200&offset=0`)

  return dispatch => {
    return fetch(activitiesUrl)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeActivities(data.collection))
      })
  }
}