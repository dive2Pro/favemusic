/**
 * Created by hyc on 16-12-31.
 */
import Cookies from 'js-cookie'
import {
  OAUTH_TOKEN, CLIENT_ID
} from '../constants/authentification'

export default function apiUrl(url, symbol) {
  const accessToken = Cookies.get(OAUTH_TOKEN)
  console.log('accessToken = ' + accessToken);
  return `//api.soundcloud.com/${url}${symbol}oauth_token=${accessToken}`
}

export function unauthApiUrl(url, symbol) {
  return `//api.soundcloud.com/${url}${symbol}client_id=${CLIENT_ID}`
}

export function addAccessToken(url, symbol) {
  const accessToken = Cookies.get(OAUTH_TOKEN)
  return `${url}${symbol}oauth_token=${accessToken}`
}

export function getLazyLoadingUrl(user, nextHref, initHref) {
  let urlPrefix;
  if (user) {
    urlPrefix = `users/${user.id}`
  } else {
    urlPrefix = `me`
  }

  if (nextHref) {
    return addAccessToken(nextHref, "&")
  } else {
    return apiUrl(`${urlPrefix}/${initHref}`, '&')
  }
}
