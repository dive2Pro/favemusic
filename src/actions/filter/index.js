import * as actionTypes from '../../constants/actionTypes'

const filterByDuration = (filterType) => {
  return {
    type: actionTypes.FILTER_BY_DURATION
    , filterType
  }
}
export { filterByDuration }
