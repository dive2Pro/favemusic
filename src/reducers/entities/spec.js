// @flow
import { MERGE_USER_ENTITIES, MERGE_TRACK_ENTITIES, SYNC_ENTITEIS } from '../../constants/actionTypes'
import entities from './index'
describe('entities Test !', () => {
  beforeEach(() => {
  })
  it('MERGE_USER_ENTITIES, there are no users yet', (done: Function) => {
    const users = { a1: 'a1', a2: 'a2', a3: 'a3' }
    const action = {
      type: MERGE_USER_ENTITIES
      , users
    }
    const result = entities(undefined, action)
    const expected = {
      users
      , songs: {}
      , tracks: {}
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
  it('MERGE_USER_ENTITIES, there are already users', (done: Function) => {
    const users = { a1: 'a1', a2: 'a2', a3: 'a3' }
    const addUsers = { b1: 'b1', b2: 'b2', b3: 'b3' }
    const action = {
      type: MERGE_USER_ENTITIES
      , users: addUsers
    }
    const state = {
      users
    }
    const result = entities(state, action)
    const expected = {
      users: { ...users, ...addUsers }
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
  it('MERGE_TRACK_ENTITIES, there are already users', (done: Function) => {
    const users = { a1: 'a1', a2: 'a2', a3: 'a3' }
    const tracks = { b1: 'b1', b2: 'b2', b3: 'b3' }
    const action = {
      type: MERGE_TRACK_ENTITIES
      , tracks
    }
    const state = {
      users
    }
    const result = entities(state, action)
    const expected = {
      users
      , tracks
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
  it('SYNC_ENTITEIS, there are already entities', (done: Function) => {
    const users = { a1: 'a1', a2: 'a2', a3: 'a3' }
    const tracks = { b1: 'b1', b2: 'b2', b3: 'b3' }
    const activeTrack = { id: 'b1', c2: 'c2', c3: 'c3' }
    const action = {
      type: SYNC_ENTITEIS
      , key: 'tracks'
      , activeTrack
    }
    const state = {
      users
      , tracks
    }
    const result = entities(state, action)
    const expected = {
      users
      , tracks: { b1: { id: 'b1', c2: 'c2', c3: 'c3' }, b2: 'b2', b3: 'b3' }
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
}
)
