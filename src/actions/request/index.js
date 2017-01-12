/**
 * Created by hyc on 17-1-5.
 */
// @flow
import * as actionTypes from '../../constants/actionTypes'
export const setRequestTypeInProcess = (inProcess, requestType) => ({
  type: actionTypes.SET_REQUESTTYPE_IN_PROCESS
  , requestType
  , inProcess
})
