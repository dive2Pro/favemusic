/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../constants/actionTypes'
import SC from 'soundcloud'
import { CLIENT_ID, REDIRECT_URI, OAUTH_TOKEN }  from '../constants/authentification'
import Cookies from 'js-cookie'
import { fetchFollowings, fetchActivities } from './user'

function setSession (session) {
  return {
    type: actionTypes.SET_SESSION,
    session
  }
}
function setUser (user) {
  return {
    type: actionTypes.SET_USER,
    user
  }
}

export function initSession () {

  return dispatch => {
    SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI })

    SC.connect().then(session => {
      Cookies.set(OAUTH_TOKEN, session.oauth_token)
      dispatch(setSession(session))
      dispatch(fetchUser(session.oauth_token))
    })
  }

}

function fetchUser (token) {
  return dispatch => {
    fetch(`//api.soundcloud.com/me?oauth_token=${token}`)
      .then(response => response.json())
      .then(me => {
        dispatch(setUser(me))
        dispatch(fetchFollowings(me))
        dispatch(fetchActivities(me))

      })

  }
}