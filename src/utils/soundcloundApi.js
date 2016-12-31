/**
 * Created by hyc on 16-12-31.
 */
import Cookies from 'js-cookie'
import {OAUTH_TOKEN} from '../constants/authentification'

export default function (url) {
  const accessToken = Cookies.get(OAUTH_TOKEN)
  return `//api.soundcloud.com/${url}&oauth_token=${accessToken}`
}
