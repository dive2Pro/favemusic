/**
 * Created by hyc on 17-1-5.
 */
import requestTest from '../../src/reducers/request'
import * as actionTypes from '../../src/constants/actionTypes'
import * as requestTypes from '../../src/constants/requestTypes'
const action = {
  type: actionTypes.SET_REQUESTTYPE_IN_PROCESS
  , requestType: requestTypes.ACTIVITIES
  , inProcess: true
}
const action2 = {
  type: actionTypes.SET_REQUESTTYPE_IN_PROCESS
  , requestType: requestTypes.FOLLOWERS
  , inProcess: true

}
describe('just test', () => {
  const initialState = { requestObject: {} }
  it('state shoud equal ', () => {
    const state = requestTest(initialState, action)
    console.log(state)
    const expected = { requestObject: { [action.requestType]: action.inProcess } }
    expect(state).to.deep.eq(expected)
  })

  it('change state', () => {
    const action3 = Object.assign({}, action, { inProcess: false })
    const state = { requestObject: { [action.requestType]: action.inProcess } }
    const state3 = requestTest(state, action3)
    const expected3 = { requestObject: { [action.requestType]: action3.inProcess } }
    expect(state3).to.deep.eq(expected3)
  })
  it('change state　failured', () => {
    const action3 = Object.assign({}, action, { inProcess: false })
    const state = { requestObject: { [action.requestType]: action.inProcess } }
    const state3 = requestTest(state, action3)
    const expected3 = { requestObject: { [action.requestType]: true } }
    assert.notDeepEqual(state3, expected3)
  })

  it('second shoud equal2', () => {
    const state = requestTest(initialState, action)
    const secondState = requestTest(state, action2)
    const expected = {
      requestObject: {
        [action.requestType]: action.inProcess
        , [action2.requestType]: action2.inProcess
      }
    }
    expect(secondState).to.deep.eq(expected)
  })
})
