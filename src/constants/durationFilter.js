import * as filterTypes from './filterTypes'
import moment from 'moment'

const DURATION_FILTER_NAMES = {
  [filterTypes.ALL]: 'ALL'
  , [filterTypes.FILTER_DURATION_MIX]: "MIX"
  , [filterTypes.FILTER_DURATION_TRACK]: "TRACK"
}

const isMixDuration = (activity) => {
  return moment.duration(activity.duration).asMinutes() > 15
}

const DURATION_FILTER_FUNCTIONS = {
  [filterTypes.ALL]: () => true
  , [filterTypes.FILTER_DURATION_TRACK]: (activity) =>
    !isMixDuration(activity)
  , [filterTypes.FILTER_DURATION_MIX]: (activity) =>
    isMixDuration(activity)
}

export {
  DURATION_FILTER_NAMES
  , DURATION_FILTER_FUNCTIONS
}
