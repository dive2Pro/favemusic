// @flow
/**
 * Created by hyc on 17-1-5.
 */
import * as actionTypes from '../constants/actionTypes'
import * as trackActions from './track'

describe('actions , track', () => {
  it('addToFavorites', (done: Function) => {
    const trackId = "FollowingsIds"
    const expectedAction = {
      type: actionTypes.ADD_TO_FAVORITES
      , trackId
    }
    const result = trackActions.addToFavorites(trackId)
    expect(result).to.deep.eq(expectedAction)
    done()
  }
  )
  it('removeFromFavorites', (done: Function) => {
    const trackId = "FollowingsIds"
    const expectedAction = {
      type: actionTypes.REMOVE_FROM_FAVORITES
      , trackId
    }
    const result = trackActions.removeFromFavorites(trackId)
    expect(result).to.deep.eq(expectedAction)
    done()
  }
  )
})
