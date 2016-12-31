/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../constants/actionTypes'

import { Map } from 'immutable'

function setSession (state, action) {

  return state.set('session', action.session)

}
function setUser (state, user) {
  console.info('user = ', user)
  return state.set('user', user)
}

const initialState = Map({
  session: null,
  user: null
})
export default function (state = initialState, action) {

  switch ( action.type ) {
    case actionTypes.SET_SESSION:
      return setSession(state, action)
    case actionTypes.SET_USER:
      return setUser(state, action.user)
    default:
      return state
  }
}