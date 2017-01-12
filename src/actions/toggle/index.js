import * as actionTypes from '../../constants/actionTypes'

export const setToggledF = (toggleType) =>
  ({
    type: actionTypes.SET_TOGGLED
    , toggleType
  })

export const resetToggledF = (toggleType) =>
  ({
    type: actionTypes.RESET_TOGGLED
    , toggleType
  })
export const setDeepToggledF = (toggleType, trackId) => ({
  type: actionTypes.SET_DEEP_TOGGLED
  , toggleType
  , trackId
})
