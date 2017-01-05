/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../constants/actionTypes'
import { isSameTrack } from '../utils/player'
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
function setFollowingsRequestNextHref(state, nextHref) {
  return Object.assign({}, state, { followingsNextHref: nextHref })
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

function setFavoritesRequestNextHref(state, nextHref) {
  return Object.assign({}, state, { favoritesNextHref: nextHref })
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
  activities: []
  , followings: []
  , followers: []
  , favorites: []
  , followingsNextHref: null
  , activitiesNextHref: null
  , followersNextHref: null
  , favoritesNextHref: null
}

function fromJS(json) {
  return json
}
function addToFavorites(state, track) {
  const favorites = { ...state.favorites, track }
  return Object.assign({}, state, { favorites })
}

function removeFromFavorites(state, track) {
  const index = state.favorites.findIndex(isSameTrack(track))
  const favorites = [
    ...state.favorites.slice(0, index)
    , ...state.favorites.slice(index + 1)
  ]
  return Object.assign({}, state, { favorites })
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

    case actionTypes.SET_FOLLOWINGS_REQUEST_NEXT_HREF:
      return setFollowingsRequestNextHref(state, action.nextHref)
    case actionTypes.SET_ACTIVITIES_REQUEST_NEXT_HREF:
      return setActivitiesRequestNextHref(state, action.nextHref)
    case actionTypes.SET_FOLLOWERS_REQUEST_NEXT_HREF:
      return setFollowersRequestNextHref(state, action.nextHref)
    case actionTypes.SET_FAVORITES_REQUEST_NEXT_HREF:
      return setFavoritesRequestNextHref(state, action.nextHref)

    case actionTypes.SET_ACTIVITIES:
      return setActivities(state, fromJS(action.activities))
    case actionTypes.SET_FOLLOWINGS:
      return setFollowings(state, fromJS(action.followings))
    case actionTypes.SET_FOLLOWERS:
      return setFollowers(state, fromJS(action.followers))
    case actionTypes.SET_FAVORITES:
      return setFavorites(state, fromJS(action.favorites))


    case actionTypes.ADD_TO_FAVORITES:
      return addToFavorites(state, action.track)
    case actionTypes.REMOVE_FROM_FAVORITES:
      return removeFromFavorites(state, action.track)
    default:
      return state
  }
}
