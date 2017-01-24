import * as sortTypes from './sortTypes'
import orderBy from 'lodash/orderBy'

const SORTFUNCTIONS = {
  [sortTypes.NONE]: (objs) => objs
  , [sortTypes.PLAYS]: (activities) => orderBy(
    activities, (activity) => activity.playback_count, 'desc')
  , [sortTypes.FAVORITES]: (activities) => orderBy(
    activities, (activity) => activity.likes_count, 'desc')
  , [sortTypes.REPOSTS]: (activities) => orderBy(
    activities, (activity) => activity.reposts_count, 'desc')
}

export { SORTFUNCTIONS }
