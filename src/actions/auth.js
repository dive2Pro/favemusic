/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../constants/index'
import SC from 'soundcloud'
function setSession (session) {
  return {
    type: actionTypes.SET_SESSION,
    session
  }
}
export function auth () {

  return dispatch => {
    SC.connect().then(session => {
      console.info(session)
      dispatch(setSession(session))
    })
  }

}