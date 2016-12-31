/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../constants/index'
import { List, Map, fromJS }from 'immutable'

function mergeFollowings (state, followings) {
  console.info(followings)
  return state.updateIn([ 'followings' ], list => list.concat(followings))

}

function mergeActivities (state, activities) {
  console.info(activities)
  return state.updateIn([ 'activities' ], list => list.concat(activities))

}

const initialState = Map({
  followings: List(),
  activities: List()
})

export default function (state = initialState, action) {
  switch ( action.type ) {
    case actionTypes.MERGE_FOLLOWINGS:
      console.info('followings = ', action)
      return mergeFollowings(state, fromJS(action.followings))
    case actionTypes.MERGE_ACTIVITIES:
      console.info('activities = ', action)
      return mergeActivities(state, fromJS(action.activities))

    default:
      return state
  }

}
