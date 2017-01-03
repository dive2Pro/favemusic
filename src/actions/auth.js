/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../constants/actionTypes'
import SC from 'soundcloud'
import {
  CLIENT_ID,
  REDIRECT_URI,
  OAUTH_TOKEN,
} from '../constants/authentification'
import apiUrl from '../utils/soundcloundApi'
import Cookies from 'js-cookie'
import { routerActions } from 'react-router-redux'

import {
  fetchFollowings,
  fetchActivities,
  fetchFollowers,
  fetchFavorites,
  setFollowings,
  setFollowers,
  setActivities
} from './user'

function setSession(session) {
  return {
    type: actionTypes.SET_SESSION,
    session
  }
}

function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    user
  }
}

function fetchUser() {
  return dispatch => {
    fetch(apiUrl('me', '?'))
      .then(response => response.json())
      .then(me => {
        dispatch(setUser(me))
        dispatch(fetchFollowings(me))
        dispatch(fetchFollowers(me))
        dispatch(fetchActivities())
        dispatch(fetchFavorites(me))
      })
  }
}
export function init() {
  return dispatch => {
    const oauth_token = Cookies.get(OAUTH_TOKEN)
    if (oauth_token !== 'null') {
      dispatch(fetchUser(oauth_token))
    } else {
      dispatch(routerActions.push('/browse'))
    }
  }
}

export function login() {
  return dispatch => {
    SC.initialize({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI
    })
    dispatch(routerActions.push('/dashboard'))
    SC.connect().then(session => {
      Cookies.set(OAUTH_TOKEN, session.oauth_token)
      dispatch(setSession(session))
      dispatch(fetchUser(session.oauth_token))
    })
  }
}

export function logout() {
  return (dispatch) => {
    dispatch(routerActions.push('/browse'))
    Cookies.set(OAUTH_TOKEN, null)
    dispatch(setSession(null))
    dispatch(setUser(null))
    dispatch(setActivities([]))
    dispatch(setFollowers([]))
    dispatch(setFollowings([]))
  }
}
