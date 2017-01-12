/**
 * Created by hyc on 17-1-1.
 */
import * as actionTypes from '../../constants/actionTypes'
import * as playerActions from './index'

describe('actions , player', () => {
  it('SET_ACTIVE_TRACK', (done: Function) => {
    const activeTrackId = 4
    const expectedAction = {
      type: actionTypes.SET_ACTIVE_TRACK
      , activeTrackId
    }
    const result = playerActions.setActiveTrack(activeTrackId)
    expect(result).to.deep.eq(expectedAction)
    done()
  }
  )
}
)

