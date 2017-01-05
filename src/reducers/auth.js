/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../constants/actionTypes'

function setSession(state, action) {
  const session = action.session
  return Object.assign({}, state, { session })
}

function setUser(state, user) {
  console.info('user = ', user)
  return Object.assign({}, state, { user })
}

const initialState = {
  session: null
  , user: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SESSION:
      return setSession(state, action)
    case actionTypes.SET_USER:
      return setUser(state, action.user)
    default:
      return state
  }
}
