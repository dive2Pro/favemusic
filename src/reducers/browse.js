// @flow
import * as actionTypes from '../constants/actionTypes'

const initialState = {
  activitiesByGenre: []
  , activitiesCurrentGenre: null
}

function mergeActivitiesByGenre(state: Map<*, *>, activities: Array<*>) {
  // return state.updateIn(['activitiesByGenre'], (list: List<*>) => list.concat(activities))
  const activitiesByGenre = [...state.activitiesByGenre, ...activities]
  return Object.assign({}, state, { activitiesByGenre })
}

export default function browse(state: Map<string, *> = initialState, action: BrowseActionType) {
  switch (action.type) {
    case actionTypes.MERGE_ACTIVITIES_BY_GENRE:
      return mergeActivitiesByGenre(state, action.activities)
    default:
      return state
  }
}
