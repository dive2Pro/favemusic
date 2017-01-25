import * as actionTypes from '../../constants/actionTypes'

const filterByDuration = (filterType) => {
  return {
    type: actionTypes.FILTER_BY_DURATION
    , filterType
  }
}

const filterByName = (filterName) => ({
  type: actionTypes.FILTER_BY_NAME
  , filterName
})

export { filterByDuration, filterByName }
