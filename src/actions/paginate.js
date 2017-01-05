/**
 * Created by hyc on 17-1-5.
 */
// @flow
import { SET_PAGINATE_LINK } from '../constants/actionTypes'
export function setPaginateLink(nextHref: string, pagnateType: string) {
  return {
    type: SET_PAGINATE_LINK
    , pagnateType
    , nextHref,
  }
}
