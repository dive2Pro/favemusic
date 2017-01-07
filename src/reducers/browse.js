// @flow
import * as actionTypes from '../constants/actionTypes'

const initialState = {
  activitiesByGenre: {}
  , activitiesCurrentGenre: null
}

function mergeActivitiesByGenre(state: Map<*, *>, activitiesIds: Array<Number>, genre: "foo") {
  const oldList = state.activitiesByGenre[genre] || []
  const newList = [
    ...oldList
    , ...activitiesIds
  ]
  const activitiesByGenre = Object.assign({}, state.activitiesByGenre, { [genre]: newList })
  return Object.assign({}, state, { activitiesByGenre })
}

export default function browse(state: Map<string, *> = initialState, action: BrowseActionType) {
  switch (action.type) {
    case actionTypes.MERGE_ACTIVITIES_BY_GENRE:
      return mergeActivitiesByGenre(state, action.activitiesIds, action.genre)
    default:
      return state
  }
}
