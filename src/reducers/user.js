/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../constants/actionTypes'

function mergeFollowings(state, receivefollowings) {
  const followings = [...state.followings, ...receivefollowings]
  return Object.assign({}, state, { followings })
}

function mergeActivities(state, receiveactivities) {
  const activities = [...state.activities, ...receiveactivities]
  return Object.assign({}, state, { activities })
}

function setActivitiesRequestNextHref(state, nextHref) {
  return Object.assign({}, state, { activitiesNextHref: nextHref })
}

function setActivitiesRequestInProcess(state, inProcess) {
  return Object.assign({}, state, { activitiesRequestInProcess: inProcess })
}

function mergeFollowers(state, receivefollowers) {
  const followers = [...state.followers, ...receivefollowers]
  return Object.assign({}, state, { followers })
}

function mergeFavorites(state, receivefavorites) {
  const favorites = [...state.favorites, ...receivefavorites]

  return Object.assign({}, state, { favorites })
}

function setFollowersRequestNextHref(state, nextHref) {
  return Object.assign({}, state, { followersNextHref: nextHref })
}

function setFollowersRequestInProcess(state, inProcess) {
  return Object.assign({}, state, { followersRequestInProcess: inProcess })
}

function setFavoritesRequestInProcess(state, inProcess) {
  return Object.assign({}, state, { favoritesRequestInProcess: inProcess })
}

function setFollowers(state, followers) {
  return Object.assign({}, state, { followers })
}

function setActivities(state, activities) {
  return Object.assign({}, state, { activities })
}

function setFollowings(state, followings) {
  return Object.assign({}, state, { followings })
}

const initialState = {
  followings: [],
  activities: [],
  followers: [],
  favorites: [],
  activitiesNextHref: null,
  activitiesRequestInProcess: false,
  followersNextHref: null,
  followersRequestInProcess: false,
  favoritesRequestInProcess: false,
}


function fromJS(json) {
  return json
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_FOLLOWINGS:
      return mergeFollowings(state, fromJS(action.followings))

    case actionTypes.SET_ACTIVITIES:
      return setActivities(state, fromJS(action.activities))
    case actionTypes.SET_FOLLOWINGS:
      return setFollowings(state, fromJS(action.followings))
    case actionTypes.SET_FOLLOWERS:
      return setFollowers(state, fromJS(action.followers))

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

    case actionTypes.SET_FAVORITES_REQUEST_IN_PROCESS:
      return setFavoritesRequestInProcess(state, action.inProcess)

    case actionTypes.MERGE_FAVORITES:
      return mergeFavorites(state, action.favorites)

    default:
      return state
  }
}
