// @flow
import * as actionTypes from '../../constants/actionTypes'
import request from './index'
import * as requestTypes from '../../constants/requestTypes'

describe('setRequestTypeInProcess', () => {
  it('set a RequestType statu when there are no requestTypeInProcess', (done: Function) => {
    const requestType = requestTypes.ACTIVITIES
    const action = {
      type: actionTypes.SET_REQUESTTYPE_IN_PROCESS
      , inProcess: true
      , requestType
    }
    const initState = {

    }

    const expectedState = {
      [requestType]: true
    }
    const result = request(initState, action)

    expect(result).to.deep.eq(expectedState)
    done()
  })

  it('set a RequestType statu when there are already have same requestTypeInProcess', (done: Function) => {
    const requestType = requestTypes.ACTIVITIES
    const action = {
      type: actionTypes.SET_REQUESTTYPE_IN_PROCESS
      , inProcess: false
      , requestType
    }

    const initState = {
      [requestTypes.ACTIVITIES]: true
    }

    const expectedState = {
      [requestType]: false
    }
    const result = request(initState, action)

    expect(result).to.deep.eq(expectedState)
    done()
  })
  it('set a RequestType statu when there are already have same requestTypeInProcess', (done: Function) => {
    const requestType = requestTypes.FOLLOWINGS
    const action = {
      type: actionTypes.SET_REQUESTTYPE_IN_PROCESS
      , inProcess: true
      , requestType
    }

    const initState = {
      [requestTypes.ACTIVITIES]: true
    }

    const expectedState = {
      ...initState
      , [requestType]: true
    }
    const result = request(initState, action)

    expect(result).to.deep.eq(expectedState)
    done()
  })
}
)

