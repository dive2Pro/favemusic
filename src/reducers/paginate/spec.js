
// @flow
import { SET_PAGINATE_LINK, SET_DEEP_PAGINATE_LINK } from '../../constants/actionTypes'
import { ACTIVITIES, FOLLOWERS } from '../../constants/paginateLinkTypes'

import paginate from './index'

describe('paginateTest', () => {
  it('SET_PAGINATE_LINK,when there are already ACTIVITIES nextHref', (done: Function) => {
    const state = { ACTIVITIES: 'world' }

    const nextHref = 'www.hoopchina.com'
    const action = {
      type: SET_PAGINATE_LINK
      , paginateLink: ACTIVITIES
      , nextHref
    }
    const result = paginate(state, action)
    const expected = {
      ACTIVITIES: nextHref
    }
    expect(result).to.deep.eq(expected)
    done()
  })
  it('SET_PAGINATE_LINK,merge FOLLOWERS when there are already ACTIVITIES nextHref', (done: Function) => {
    const state = { ACTIVITIES: 'world' }

    const nextHref = 'www.hoopchina.com'
    const action = {
      type: SET_PAGINATE_LINK
      , paginateLink: FOLLOWERS
      , nextHref
    }
    const result = paginate(state, action)
    const expected = {
      ...state, FOLLOWERS: nextHref
    }
    expect(result).to.deep.eq(expected)
    done()
  })
  it('SET_PAGINATE_LINK, when there are no  paginate ', (done: Function) => {
    const nextHref = 'www.hoopchina.com'
    const action = {
      type: SET_PAGINATE_LINK
      , paginateLink: FOLLOWERS
      , nextHref
    }
    const result = paginate(undefined, action)
    const expected = {
      FOLLOWERS: nextHref
    }
    expect(result).to.deep.eq(expected)
    done()
  })
  it('SET_DEEP_REQUESTTYPE_IN_PROCESS , when there are no paginate ', (done: Function) => {
    const trackId = 9527
    const paginateType = "Foo"
    const nextHref = "www.google.com"
    const action = {
      type: SET_DEEP_PAGINATE_LINK
      , nextHref
      , trackId
      , paginateType
    }

    const initState = { }

    const expectedState = {
      ...initState
      , [paginateType]: {
        [trackId]: nextHref
      }
    }
    const result = paginate(initState, action)
    expect(result).to.deep.eq(expectedState)
    done()
  })
  it('SET_DEEP_REQUESTTYPE_IN_PROCESS ,change  when there are have paginate ', (done: Function) => {
    const trackId = 9527
    const paginateType = "Foo"
    const nextHref = "www.google.com"
    const action = {
      type: SET_DEEP_PAGINATE_LINK
      , nextHref
      , trackId
      , paginateType
    }

    const initState = {
      [paginateType]: {
        [trackId]: "gogogogogo"
      }
    }

    const expectedState = {
      [paginateType]: {
        [trackId]: nextHref
      }
    }
    const result = paginate(initState, action)
    expect(result).to.deep.eq(expectedState)
    done()
  })
}
)
