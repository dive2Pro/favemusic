import * as actionTypes from '../../constants/actionTypes'
import * as filterTypes from '../../constants/filterTypes'

const initialState = {
  durationType: filterTypes.ALL
  , filterName: ""
}

const setfilterByDuration = (state, filterType) => {
  return {
    ...state
    , durationType: filterType
  }
}

const setfilterByName = (state, filterName) => ({
  ...state
  , filterName
})

const filter = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_BY_DURATION:
      return setfilterByDuration(state, action.filterType)
    case actionTypes.FILTER_BY_NAME:
      return setfilterByName(state, action.filterName)
    default :
      return state
  }
}

export default filter
