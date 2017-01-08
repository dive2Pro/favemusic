// @flow
import * as actionTypes from '../constants/actionTypes'

const initialState = {
  activitiesByGenre: {}
  , activitiesCurrentGenre: null
}

const mergeActivitiesByGenre = (state: Map<*, *>, activitiesIds: [Number], genre: "foo") => {
  const oldList = state.activitiesByGenre[genre] || []
  const newList = [
    ...oldList
    , ...activitiesIds
  ]
  const activitiesByGenre = Object.assign({}, state.activitiesByGenre, { [genre]: newList })
  return { ...state, activitiesByGenre }
}

const browse = (state: Map<string, *> = initialState, action: BrowseActionType) => {
  switch (action.type) {
    case actionTypes.MERGE_ACTIVITIES_BY_GENRE:
      return mergeActivitiesByGenre(state, action.activitiesIds, action.genre)
    default:
      return state
  }
}

export default browse
