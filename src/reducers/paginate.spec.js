
// @flow
import { SET_PAGINATE_LINK } from '../constants/actionTypes'
import { ACTIVITIES, FOLLOWERS } from '../constants/paginateLinkTypes'

import paginate from './paginate'

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
}
)
