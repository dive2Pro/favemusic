import * as actionTypes from '../../constants/actionTypes'
const initialState = {}
const setToggled = (state, toggleType) => {
  const toggleObject = {}
  toggleObject[toggleType] = !state[toggleType]
  return { ...state, ...toggleObject }
}

const resetToggled = (state, toggleType) => {
  const toggleObject = {}
  toggleObject[toggleType] = false
  console.log(toggleType, 'toggleObject = ', toggleObject);
  return { ...state, ...toggleObject }
}
const setDeepToggled = (state, reveivedToggleType, trackId) => {
  const toggleType = state[reveivedToggleType] || {}
  toggleType[trackId] = !toggleType[trackId]
  return { ...state, [reveivedToggleType]: toggleType }
}
const resetAllDeepToggled = (state, reveivedToggleType) => {
  return { ...state, [reveivedToggleType]: {} }
}
const toggle = (state = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_TOGGLED:
      return setToggled(state, action.toggleType)
    case actionTypes.RESET_TOGGLED:
      return resetToggled(state, action.toggleType)
    case actionTypes.SET_DEEP_TOGGLED:
      return setDeepToggled(state, action.toggleType, action.trackId)
    case actionTypes.RESET_ALL_DEEP_TOGGLED:
      return resetAllDeepToggled(state, action.toggleType)
    default:
      return state
  }
}

export default toggle
