import * as actionTypes from '../../constants/actionTypes'
import toggle from './index'
import * as toggleTypes from '../../constants/toggleTypes'

describe('SET_TOGGLED', () => {
  it('SET_TOGGLED  when there are no toggleObject', (done: Function) => {
    const toggleType = toggleTypes.PLAYLISTTYPE
    const action = {
      type: actionTypes.SET_TOGGLED
      , toggleType
    }
    const initState = {

    }

    const expectedState = {
      [toggleType]: true
    }
    const result = toggle(initState, action)

    expect(result).to.deep.eq(expectedState)
    done()
  })
  it('SET_TOGGLED  when there are already toggleObject', (done: Function) => {
    const toggleType = toggleTypes.PLAYLISTTYPE
    const action = {
      type: actionTypes.SET_TOGGLED
      , toggleType
    }
    const initState = {
      toggleType
    }

    const expectedState = {
      ...initState
      , [toggleType]: true
    }
    const result = toggle(initState, action)

    expect(result).to.deep.eq(expectedState)
    done()
  })
  it('RESET_TOGGLED  when there are already toggleObject', (done: Function) => {
    const toggleType = toggleTypes.PLAYLISTTYPE
    const toggleType2 = toggleTypes.FOLLOWERSTYPE
    const action = {
      type: actionTypes.RESET_TOGGLED
      , toggleType
    }
    const initState = {
      [toggleType]: true
    }

    const expectedState = {
      [toggleType]: false
    }
    const result = toggle(initState, action)
    expect(result).to.deep.eq(expectedState)
    const init2 = {
      ...result
      , [toggleType2]: true
    }
    const action2 = {
      type: actionTypes.RESET_TOGGLED
      , toggleType: toggleType2
    }
    const result2 = toggle(init2, action2)
    const expectedState2 = {
      [toggleType]: false
      , [toggleType2]: false
    }
    expect(result2).to.deep.eq(expectedState2)
    done()
  })
}
)

describe('SET_DEEP_TOGGLED', () => {
  it('SET_DEEP_TOGGLED  when there are no toggleObject', (done: Function) => {
    const toggleType = toggleTypes.PLAYLISTTYPE
    const trackId = 1234
    const action = {
      type: actionTypes.SET_DEEP_TOGGLED
      , toggleType
      , trackId
    }
    const initState = {

    }

    const expectedState = {
      [toggleType]: {
        [trackId]: true
      }
    }
    const result = toggle(initState, action)

    expect(result).to.deep.eq(expectedState)
    done()
  })
  it('SET_DEEP_TOGGLED  when there are already toggleObject', (done: Function) => {
    const toggleType = toggleTypes.PLAYLISTTYPE
    const trackId = 1234
    const action = {
      type: actionTypes.SET_DEEP_TOGGLED
      , toggleType
      , trackId
    }
    const initState = {
      [toggleType]: {
        [trackId]: true
      }
    }

    const expectedState = {
      [toggleType]: {
        [trackId]: false
      }
    }
    const result = toggle(initState, action)

    expect(result).to.deep.eq(expectedState)
    done()
  })
  it('RESET_DEEP_TOGGLED  when there are already toggleObject', (done: Function) => {
    const toggleType = toggleTypes.PLAYLISTTYPE
    const action = {
      type: actionTypes.RESET_ALL_DEEP_TOGGLED
      , toggleType
    }
    const initState = {
      [toggleType]: {
        123: true
        , 321: true
      }
    }

    const expectedState = {
      [toggleType]: { }
    }
    const result = toggle(initState, action)
    expect(result).to.deep.eq(expectedState)
    done()
  })
}
)
