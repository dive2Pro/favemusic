/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../constants/actionTypes'
import { isSameById } from '../utils/player'
function mergeFollowings(state, receivefollowings) {
  const followingsIds = [...state.followingsIds, ...receivefollowings]
  return Object.assign({}, state, { followingsIds })
}

function mergeActivities(state, receiveactivities) {
  const activitiesIds = [...state.activitiesIds, ...receiveactivities]
  return Object.assign({}, state, { activitiesIds })
}

function mergeFollowers(state, receivefollowers) {
  const followersIds = [...state.followersIds, ...receivefollowers]
  return Object.assign({}, state, { followersIds })
}

function mergeFavorites(state, receivefavorites) {
  const favoritesIds = [...state.favoritesIds, ...receivefavorites]

  return Object.assign({}, state, { favoritesIds })
}

function setFollowers(state, followers) {
  return Object.assign({}, state, { followers })
}
function setFavorites(state, favorites) {
  return Object.assign({}, state, { favorites })
}

function setActivities(state, activities) {
  return Object.assign({}, state, { activities })
}

function setFollowings(state, followings) {
  return Object.assign({}, state, { followings })
}

const initialState = {
  activitiesIds: []
  , followersIds: []
  , followingsIds: []
  , favoritesIds: []
}

function fromJS(json) {
  return json
}
function addToFavorites(state, trackId) {
  const favoritesIds = [...state.favoritesIds, trackId]
  const newState = Object.assign({}, state, { favoritesIds })
  console.info('newState = ', newState);
  return newState
}

function removeFromFavorites(state, trackId) {
  const index = state.favoritesIds.findIndex(isSameById(trackId))
  if (index < 0) {
    return state
  }
  const favoritesIds = [
    ...state.favoritesIds.slice(0, index)
    , ...state.favoritesIds.slice(index + 1)
  ]
  return Object.assign({}, state, { favoritesIds })
}
function removeFromFollowings(state: {}, userId: number) {
  const index = state.followingsIds.findIndex(isSameById(userId))
  if (index < 0) {
    return state
  }
  const followingsIds = [
    ...state.followingsIds.slice(0, index)
    , ...state.followingsIds.slice(index + 1)
  ]
  return { ...state, followingsIds }
}
export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.MERGE_FOLLOWINGS:
      return mergeFollowings(state, fromJS(action.followings))
    case actionTypes.MERGE_FAVORITES:
      return mergeFavorites(state, action.favorites)
    case actionTypes.MERGE_ACTIVITIES:
      return mergeActivities(state, fromJS(action.activities))
    case actionTypes.MERGE_FOLLOWERS:
      return mergeFollowers(state, fromJS(action.followers))
    case actionTypes.SET_ACTIVITIES:
      return setActivities(state, fromJS(action.activities))
    case actionTypes.SET_FOLLOWINGS:
      return setFollowings(state, fromJS(action.followings))
    case actionTypes.SET_FOLLOWERS:
      return setFollowers(state, fromJS(action.followers))
    case actionTypes.SET_FAVORITES:
      return setFavorites(state, fromJS(action.favorites))

    case actionTypes.ADD_TO_FAVORITES:
      return addToFavorites(state, action.trackId)
    case actionTypes.REMOVE_FROM_FAVORITES:
      return removeFromFavorites(state, action.trackId)
    case actionTypes.REMOVE_FROM_FOLLOWINGS:
      return removeFromFollowings(state, action.userId)
    default:
      return state
  }
}
