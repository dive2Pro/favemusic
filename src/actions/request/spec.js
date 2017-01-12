/**
 * Created by hyc on 17-1-5.
 */
// @flow
import * as actionTypes from '../../constants/actionTypes'
import * as requestActions from './index'

describe('actions , player', () => {
  it('SET_ACTIVE_TRACK', (done: Function) => {
    const requestType = "FollowingsIds"
    const inProcess = true
    const expectedAction = {
      type: actionTypes.SET_REQUESTTYPE_IN_PROCESS
      , requestType
      , inProcess
    }
    const result = requestActions.setRequestTypeInProcess(inProcess, requestType)
    expect(result).to.deep.eq(expectedAction)
    done()
  }
  )
}
)

