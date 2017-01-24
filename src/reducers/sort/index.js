import * as sortTypes from '../../constants/sortTypes'
import {SORT_BY_TYPE} from '../../constants/actionTypes'
const initialState = {
  sortType: sortTypes.NONE
}
const setSortType = (state, sortType) => ({
  ...state
  , sortType
})

const sort = (state = initialState, action) => {
  switch (action.type) {
    case SORT_BY_TYPE:
      return setSortType(state, action.sortType)
    default:
      return state
  }
}

export default sort
