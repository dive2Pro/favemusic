import * as actionTypes from '../../constants/actionTypes'
import * as filterTypes from '../../constants/filterTypes'

const initialState = {
  durationType: filterTypes.NONE
}

const setfilterByDuration = (state, filterType) => {
  return {
    ...state
    , durationType: filterType
  }
}

const filter = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_BY_DURATION:
      return setfilterByDuration(state, action.filterType)
    default :
      return state
  }
}

export default filter
