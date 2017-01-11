import * as actionTypes from '../constants/actionTypes'
import * as toggleActions from './toggle'

describe('actions , player', () => {
  it('setToggledF', (done: Function) => {
    const toggleType = "FollowingsIds"
    const expectedAction = {
      type: actionTypes.SET_TOGGLED
      , toggleType
    }
    const result = toggleActions.setToggledF(toggleType)
    expect(result).to.deep.eq(expectedAction)
    done()
  }
  )
  it('resetToggledF', (done: Function) => {
    const toggleType = "FollowingsIds"
    const expectedAction = {
      type: actionTypes.RESET_TOGGLED
      , toggleType
    }
    const result = toggleActions.resetToggledF(toggleType)
    expect(result).to.deep.eq(expectedAction)
    done()
  }
  )
})
