// @flow
import {
  SYNC_ENTITEIS, MERGE_USER_ENTITIES, MERGE_TRACK_ENTITIES,
  MERGE_SONGS_ENTITIES } from '../../constants/actionTypes'
import * as mergeActions from './index'

describe('Action , entities', () => {
  it('mergeUserEntities,has toggled ', (done: Function) => {
    const users = ['u1', 'u2', 'u3', 'u4']

    const result = mergeActions.mergeUserEntities(users)

    const expected = {
      type: MERGE_USER_ENTITIES
      , users
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
  it('mergeTrackEntities,has toggled ', (done: Function) => {
    const tracks = ['u1', 'u2', 'u3', 'u4']

    const result = mergeActions.mergeTrackEntities(tracks)

    const expected = {
      type: MERGE_TRACK_ENTITIES
      , tracks
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
  it('syncEntities,has toggled ', (done: Function) => {
    const activeTrack = { u1: 'u2', u3: 'u4' }
    const key = 'Followings'
    const result = mergeActions.syncEntities(activeTrack, key)

    const expected = {
      type: SYNC_ENTITEIS
      , activeTrack
      , key
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
}
)

