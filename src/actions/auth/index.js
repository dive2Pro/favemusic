/**
 * Created by hyc on 16-12-31.
 */
import * as actionTypes from '../../constants/actionTypes'
import {
  CLIENT_ID,
  REDIRECT_URI,
  OAUTH_TOKEN,
} from '../../constants/authentification'
import apiUrl from '../../services/soundcloundApi'
import Cookies from 'js-cookie'
import { routerActions } from 'react-router-redux'
import {
  fetchFollowingsF
  , fetchActivities
  , fetchFollowersF
  , fetchFavoritesF
} from '../user/index'
import { changeLocation } from '../location/index'

const setSession = (session) =>
  ({
    type: actionTypes.SET_SESSION
    , session
  })


const setUser = (user) =>
  ({
    type: actionTypes.SET_USER
    , user
  })

const fetchUser = () =>
  dispatch => {
    fetch(apiUrl('me', '?'))
      .then(response => response.json())
      .then(me => {
        dispatch(setUser(me))
        dispatch(fetchActivities())
        dispatch(fetchFavoritesF(me))
        dispatch(fetchFollowingsF(me))
        dispatch(fetchFollowersF(me))
      })
  }

export const init = () =>
  dispatch => {
    const oauth_token = Cookies.get(OAUTH_TOKEN)
    console.info('oauth_token = ', oauth_token)
    if (oauth_token !== undefined && oauth_token !== null && oauth_token !== 'null') {
      dispatch(changeLocation('/dashboard'))
      dispatch(fetchUser(oauth_token))
    } else {
      console.info('dispatch - --', routerActions)
      dispatch(changeLocation('/browse'))
    }
  }


export const login = () =>
  dispatch => {
    const SC = require('soundcloud')
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

const resetSession = () => (
  {
    type: actionTypes.RESET_SESSION
  }
)
export const logout = () =>
  (dispatch) => {
    Cookies.set(OAUTH_TOKEN, null)
    dispatch(changeLocation('/browse'))
    dispatch(resetSession())
  }
