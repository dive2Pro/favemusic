import * as actionTypes from '../constants/actionTypes'
const initialState = {}
const setToggled = (state, toggleType) => {
  const toggleObject = {}
  toggleObject[toggleType] = !state[toggleType]
  return { ...state, ...toggleObject }
}

const resetToggled = (state, toggleType) => {
  const toggleObject = {}
  toggleObject[toggleType] = false
  return { ...state, ...toggleObject }
}

const toggle = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_TOGGLED:
      return setToggled(state, action.toggleType)
    case actionTypes.RESET_TOGGLED:
      return resetToggled(state, action.toggleType)
    default:
      return state
  }
}
export default toggle
