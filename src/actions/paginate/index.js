// @flow
import { SET_PAGINATE_LINK } from '../../constants/actionTypes'
export const setPaginateLink = (nextHref: string, pagnateType: string) => ({
  type: SET_PAGINATE_LINK
  , pagnateType
  , nextHref,
})

