// @flow
import * as actionTypes from '../constants/actionTypes'

const initialState = {
}

const mergeActivitiesByGenre = (state: Map<*, *>, activitiesIds: [Number], genre: "foo") => {
  const oldList = state[genre] || []
  const newList = [
    ...oldList
    , ...activitiesIds
  ]
  return Object.assign({}, state, { [genre]: newList })
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
