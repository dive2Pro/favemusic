/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../constants/index'
import SC from 'soundcloud'

function auth (state, action) {
  console.info({ ...state })
  let newState = { ...state, session: action.session }
 ;
  console.info(newState)
  return newState
}

const initialState = []
export default function (state = initialState, action) {
  console.info(state)
  switch ( action.type ) {
    case actionTypes.SET_SESSION:
      return auth(state, action)
    default:
      return state
  }
}