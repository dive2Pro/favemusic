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
  fetchFollowingsF
  , fetchActivities
  , fetchFollowersF
  , fetchFavoritesF
  , setFollowings
  , setFollowers
  , setActivities
  , setFavorites
} from './user'
import { changeLocation } from './location'

function setSession(session) {
  return {
    type: actionTypes.SET_SESSION
    , session
  }
}

function setUser(user) {
  return {
    type: actionTypes.SET_USER
    , user
  }
}

function fetchUser() {
  return dispatch => {
    fetch(apiUrl('me', '?'))
      .then(response => response.json())
      .then(me => {
        dispatch(setUser(me))
        dispatch(fetchFollowingsF(me))
        dispatch(fetchFollowersF(me))
        dispatch(fetchActivities())
        dispatch(fetchFavoritesF(me))
      })
  }
}
export function init() {
  return dispatch => {
    const oauth_token = Cookies.get(OAUTH_TOKEN)
    console.info('oauth_token = ', oauth_token)
    if (oauth_token !== undefined && oauth_token !== null && oauth_token !== 'null') {
      dispatch(fetchUser(oauth_token))
    } else {
      console.info('dispatch - --', routerActions)
      dispatch(changeLocation('/browse'))
    }
  }
}

export function login() {
  return dispatch => {
    SC.initialize({
      client_id: CLIENT_ID
      , redirect_uri: REDIRECT_URI
    })
    SC.connect().then(session => {
      Cookies.set(OAUTH_TOKEN, session.oauth_token)
      dispatch(changeLocation('/dashboard'))
      dispatch(setSession(session))
      dispatch(fetchUser(session.oauth_token))
    })
  }
}

export function logout() {
  return (dispatch) => {
    Cookies.set(OAUTH_TOKEN, null)
    dispatch(changeLocation('/browse'))
    dispatch(setSession(null))
    dispatch(setUser(null))
    dispatch(setActivities([]))
    dispatch(setFollowers([]))
    dispatch(setFollowings([]))
    dispatch(setFavorites([]))
  }
}
