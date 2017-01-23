
import * as actionTypes from '../../constants/actionTypes'
import { isSameById } from '../../services/player'
import reduce from 'lodash/fp/reduce'

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
  , typeReposts: {}
  , typeTracks: {}
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
  console.log('removeFromFavorites ', index);
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

const countByType = (result, track) => {
  /* eslint-disable no-param-reassign*/
  result[track.id] = result[track.id] ? result[track.id] + 1 : result[track.id]
  /* eslint-enable no-param-reassign*/
  return result
}

const mergeTrackTypesRepost = (state, tracks) => {
  const { typeReposts } = state
  const mergeType = reduce(countByType, typeReposts)
  return {
    ...state
    , typeReposts: mergeType(tracks)
  }
}

const mergeTrackTypesTrack = (state, tracks) => {
  const { typeTracks } = state
  const mergeType = reduce(countByType, typeTracks)
  return {
    ...state
    , typeTracks: mergeType(tracks)
  }
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
    case actionTypes.MERGE_TRACK_TYPES_REPOST:
      return mergeTrackTypesRepost(state, action.tracks)
    case actionTypes.MERGE_TRACK_TYPES_TRACK:
      return mergeTrackTypesTrack(state, action.tracks)
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
