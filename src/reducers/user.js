/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../constants/index'
import { List, Map, fromJS }from 'immutable'

function mergeFollowings (state, followings) {
  console.info(followings)
  return state.updateIn([ 'followings' ], list => list.concat(followings))

}

const initialState = Map({
  followings: List()
})

export default function (state = initialState, action) {
  switch ( action.type ) {
    case actionTypes.MERGE_FOLLOWINGS:
      console.info('followings = ', action)
      return mergeFollowings(state, fromJS(action.followings))
    default:
      return state
  }

}
