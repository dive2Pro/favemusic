// @flow
import { SET_PAGINATE_LINK } from '../../constants/actionTypes'
import { setPaginateLink } from './index'
describe('Action , paginate', () => {
  it('mergeUserEntities,has toggled ', (done: Function) => {
    const pagnateType = "The House"
    const nextHref = 'www.google.com'
    const result = setPaginateLink(nextHref, pagnateType)

    const expected = {
      type: SET_PAGINATE_LINK
      , pagnateType
      , nextHref
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
}
)
