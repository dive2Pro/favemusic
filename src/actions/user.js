/**
 * Created by hyc on 16-12-31.
 */
import Cookies from 'js-cookie'
import * as actionTypes from '../constants/index'
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
  const accessToken = Cookies.get('accessToken')
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
  const accessToken = Cookies.get('accessToken')
  const activitiesUrl = `//api.soundcloud.com/me/activities?limit=200&offset=0&oauth_token=${accessToken}`;

  return dispatch => {
    return fetch(activitiesUrl)
      .then(response => response.json())
      .then(data => {
        dispatch(mergeActivities(data.collection))
      })
  }
}