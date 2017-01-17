/**
 * Created by hyc on 16-12-31.
 */
// @flow
import Cookies from 'js-cookie'
import {
  OAUTH_TOKEN, CLIENT_ID
} from '../constants/authentification'

export function unauthApiUrl(url, symbol) {
  return `//api.soundcloud.com/${url}${symbol}client_id=${CLIENT_ID}`
}

export default function apiUrl(url: string, symbol: string) {
  const accessToken = Cookies.get(OAUTH_TOKEN)
  if (!accessToken) {
    return unauthApiUrl(url, symbol)
  }
  return `//api.soundcloud.com/${url}${symbol}oauth_token=${accessToken}`
}

export function addAccessToken(url, symbol) {
  const accessToken = Cookies.get(OAUTH_TOKEN)
  if (accessToken) {
    return `${url}${symbol}oauth_token=${accessToken}`
  }
  return `${url}${symbol}client_id=${CLIENT_ID}`
}

export function getLazyLoadingUserUrl(user, nextHref, initHref) {
  function getUserPrefix(u) {
    return u ? `users/${u.id}` : 'me'
  }

  if (nextHref) {
    return addAccessToken(nextHref, "&")
  } else {
    return apiUrl(`${getUserPrefix(user)}/${initHref}`, '&')
  }
}

export function getLazyLoadingCommentUrl(nextHref, initHref) {
  if (nextHref) {
    return nextHref
  }
  return unauthApiUrl(initHref, "&")
}
