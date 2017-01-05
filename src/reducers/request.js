/**
 * Created by hyc on 17-1-5.
 */
// @flow
import * as actionTypes from '../constants/actionTypes'
const initialState = {
  requestObject: {}
}
function setRequestTypeInProcess(state, inProcess, requestType) {
  const requestObject = state.requestObject
  requestObject[requestType] = inProcess
  // Object.assign({}, state.requestObject, { [requestType]: inProcess })
  return Object.assign({}, state, { requestObject })
}

export default function (state = initialState, action: RequestType) {
  switch (action.type) {
    case actionTypes.SET_REQUESTTYPE_IN_PROCESS:
      return setRequestTypeInProcess(state, action.inProcess, action.requestType)
    default:
      return state
  }
}
