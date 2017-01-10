
import * as actionTypes from '../constants/actionTypes'
import { isSameById } from '../services/player'

const concatList = (currentList, targetList) => {
  return [
    ...currentList
    , ...targetList
  ]
}

const mergeFollowings = (state, receivefollowings) => {
  const followingsIds = concatList(state.followingsIds, receivefollowings)
  return { ...state, followingsIds }
}

const mergeActivities = (state, receiveactivities) => {
  const activitiesIds = concatList(state.activitiesIds, receiveactivities)
  return { ...state, activitiesIds }
}

const mergeFollowers = (state, receivefollowers) => {
  const followersIds = concatList(state.followersIds, receivefollowers)
  return { ...state, followersIds }
}

const mergeFavorites = (state, receivefavorites) => {
  const favoritesIds = concatList(state.favoritesIds, receivefavorites)
  return { ...state, favoritesIds }
}

const initialState = {
  activitiesIds: []
  , followersIds: []
  , followingsIds: []
  , favoritesIds: []
}

const addToFavorites = (state, trackId) => {
  const favoritesIds = [...state.favoritesIds, trackId]
  return { ...state, favoritesIds }
}

const removeFromFavorites = (state, trackId) => {
  const index = state.favoritesIds.findIndex(isSameById(trackId))
  if (index < 0) {
    return state
  }
  const favoritesIds = [
    ...state.favoritesIds.slice(0, index)
    , ...state.favoritesIds.slice(index + 1)
  ]
  return { ...state, favoritesIds }
}

const removeFromFollowings = (state: {}, userId: number) => {
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
      return mergeFollowings(state, action.followings)
    case actionTypes.MERGE_FAVORITES:
      return mergeFavorites(state, action.favorites)
    case actionTypes.MERGE_ACTIVITIES:
      return mergeActivities(state, action.activities)
    case actionTypes.MERGE_FOLLOWERS:
      return mergeFollowers(state, action.followers)

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
