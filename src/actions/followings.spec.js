// @flow
import apiUrl from '../services/soundcloundApi'
import { mergeFollowings } from './user'
import { removeFromFollowings } from './followings'
import { REMOVE_FROM_FOLLOWINGS } from '../constants/actionTypes'

describe('Action , followings', () => {
  it('removeFromFollowings,has toggled ', (done: Function) => {
    const userId = 'uId'
    const result = removeFromFollowings(userId)

    const expected = {
      type: REMOVE_FROM_FOLLOWINGS
      , userId
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
}
)