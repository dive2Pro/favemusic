/**
 * Created by hyc on 17-1-5.
 */
// @flow
import * as actionTypes from '../../constants/actionTypes'
const setRequestTypeInProcess = (inProcess, requestType) => ({
  type: actionTypes.SET_REQUESTTYPE_IN_PROCESS
  , requestType
  , inProcess
})
const setDeepRequestTypeInProcess = (inProcess, requestType, trackId) => ({
  type: actionTypes.SET_DEEP_REQUESTTYPE_IN_PROCESS
  , requestType
  , inProcess
  , trackId
})
export { setRequestTypeInProcess, setDeepRequestTypeInProcess }
