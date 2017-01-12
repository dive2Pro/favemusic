// @flow
import * as actionTypes from '../../constants/actionTypes'
const initialState = {}
const setRequestTypeInProcess = (state: {}, inProcess: boolean, requestType: string) => {
  const requestObject = {}
  requestObject[requestType] = inProcess
  return { ...state, ...requestObject }
}

const setDeepRequestTypeInProcess = (state: {}, receivedRequestType: string, inProcess: boolean, trackId: string) => {
  const requestType = state[receivedRequestType] || {}
  requestType[trackId] = inProcess
  return { ...state, [receivedRequestType]: requestType }
}

export default function (state: {} = initialState, action: RequestType) {
  switch (action.type) {
    case actionTypes.SET_REQUESTTYPE_IN_PROCESS:
      return setRequestTypeInProcess(state, action.inProcess, action.requestType)
    case actionTypes.SET_DEEP_REQUESTTYPE_IN_PROCESS:
      return setDeepRequestTypeInProcess(state, action.requestType
        , action.inProcess, action.trackId
      )
    default:
      return state
  }
}
