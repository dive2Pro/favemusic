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
  it('set a Comment RequestType statu when there are already have same requestTypeInProcess', (done: Function) => {
    const trackId = 9527
    const requestType = "Foo"
    const action = {
      type: actionTypes.SET_DEEP_REQUESTTYPE_IN_PROCESS
      , inProcess: true
      , trackId
      , requestType
    }

    const initState = {
      [requestTypes.ACTIVITIES]: true
    }

    const expectedState = {
      ...initState
      , [requestType]: {
        [trackId]: true
      }
    }
    const result = request(initState, action)
    expect(result).to.deep.eq(expectedState)
    done()
  })
  it('change a Comment RequestType statu ', (done: Function) => {
    const trackId = 9527
    const requestType = "Foo"
    const action = {
      type: actionTypes.SET_DEEP_REQUESTTYPE_IN_PROCESS
      , inProcess: false
      , trackId
      , requestType
    }

    const initState = {
      [requestTypes.ACTIVITIES]: true
      , [requestType]: {
        [trackId]: true
      }
    }

    const expectedState = {
      ...initState
      , [requestType]: {
        [trackId]: false
      }
    }
    const result = request(initState, action)
    expect(result).to.deep.eq(expectedState)
    done()
  })
}
)

