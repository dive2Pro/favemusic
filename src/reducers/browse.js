// @flow
import * as actionTypes from '../constants/actionTypes'

const initialState = {
  activitiesByGenreInProcess: false,
  activitiesByGenre: [],
  activitiesByGenreNextHref: {},
  activitiesCurrentGenre: null
}

function mergeActivitiesByGenre(state: Map<*, *>, activities: Array<*>) {
  // return state.updateIn(['activitiesByGenre'], (list: List<*>) => list.concat(activities))
  const activitiesByGenre = [...state.activitiesByGenre, ...activities]
  return Object.assign({}, state, { activitiesByGenre })
}

function setActivitiesByGenreRequestInProcess(state: Map<string, *>, inProcess: boolean) {
  // return state.set('activitiesByGenreInProcess', inProcess)
  return Object.assign({}, state, { activitiesByGenreInProcess: inProcess })
}

function setActivitiesByGenreNextHref(state: Map<string, *>, action: BrowseSetNextHrefActionType) {
  const { genre, nextHref } = action
  // return state.updateIn(['activitiesByGenreNextHref'], (map: Map<string, string>) => map.set(genre, nextHref))
  const activitiesByGenreNextHref = Object.assign({}, state.activitiesByGenreNextHref, { [genre]: nextHref })
  return Object.assign({}, state, activitiesByGenreNextHref)
}

export default function browse(state: Map<string, *> = initialState, action: BrowseActionType) {
  switch (action.type) {
    case actionTypes.MERGE_ACTIVITIES_BY_GENRE:
      return mergeActivitiesByGenre(state, action.activities)
    case actionTypes.SET_ACTIVITIES_BY_GENRE_REQUEST_IN_PROCESS:
      return setActivitiesByGenreRequestInProcess(state, action.inProcess)
    case actionTypes.SET_ACTIVITIES_BY_GENRE_NEXT_HREF:
      return setActivitiesByGenreNextHref(state, action)
    default:
      return state
  }
}
