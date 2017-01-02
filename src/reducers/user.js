/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../constants/actionTypes'
import { List, Map, fromJS } from 'immutable'

function mergeFollowings (state, followings) {
  console.info('followings = ', followings)
  return state.updateIn([ 'followings' ], list => list.concat(followings))

}

function mergeActivities (state, activities) {
  console.info('activities = ', activities)
  return state.updateIn([ 'activities' ], list => list.concat(activities))
}

function setActivitiesRequestNextHref (state, nextHref) {
  return state.set('activitiesNextHref', nextHref)
}

function setActivitiesRequestInProcess (state, inProcess) {
  return state.set('activitiesRequestInProcess', inProcess)
}

function mergeFollowers (state, followers) {
  return state.updateIn([ 'followers' ], list => list.concat(followers))
}

function setFollowersRequestNextHref (state, nextHref) {
  return state.set('followersNextHref', nextHref)
}

function setFollowersRequestInProcess (state, inProcess) {
  return state.set('followersRequestInProcess', inProcess)
}
const initialState = Map({
  followings: List(),
  activities: List(),
  followers: List(),
  activitiesNextHref: null,
  activitiesRequestInProcess: false,
  followersNextHref: null,
  followersRequestInProcess: false,

})

export default function (state = initialState, action) {
  switch ( action.type ) {
    case actionTypes.MERGE_FOLLOWINGS:

      return mergeFollowings(state, fromJS(action.followings))

    case actionTypes.MERGE_ACTIVITIES:

      return mergeActivities(state, fromJS(action.activities))

    case actionTypes.MERGE_FOLLOWERS:
      return mergeFollowers(state, fromJS(action.followers))
    case actionTypes.SET_FOLLOWERS_REQUEST_IN_PROCESS:
      return setFollowersRequestInProcess(state, action.inProcess)

    case actionTypes.SET_FOLLOWERS_REQUEST_NEXT_HREF:
      return setFollowersRequestNextHref(state, action.nextHref)

    case actionTypes.SET_ACTIVITIES_REQUEST_IN_PROCESS:
      return setActivitiesRequestInProcess(state, action.inProcess)

    case actionTypes.SET_ACTIVITIES_REQUEST_NEXT_HREF:
      return setActivitiesRequestNextHref(state, action.nextHref)

    default:
      return state
  }

}
