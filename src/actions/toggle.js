import * as actionTypes from '../constants/actionTypes'

export const setToggledF = (toggleType) =>
  dispatch =>
    dispatch({
      type: actionTypes.SET_TOGGLED
      , toggleType
    })

export const resetToggledF = (toggleType) =>
  dispatch =>
    dispatch({
      type: actionTypes.RESET_TOGGLED
      , toggleType
    })
