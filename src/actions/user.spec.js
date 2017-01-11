import { MERGE_ACTIVITIES, MERGE_FOLLOWINGS, MERGE_FOLLOWERS } from '../constants/actionTypes'
import { mergeActivities, mergeFollowers, mergeFollowings } from './user'
describe('user case', () => {
  it('fetchActivities', done => {
    const activities = { x: "123", y: "456" }
    const expected = {
      type: MERGE_ACTIVITIES
      , activities
    }
    expect(mergeActivities(activities)).to.deep.eq(expected)
    done()
  })
  it('mergeFollowings', done => {
    const followings = { x: "123", y: "456" }
    const expected = {
      type: MERGE_FOLLOWINGS
      , followings
    }
    expect(mergeFollowings(followings)).to.deep.eq(expected)
    done()
  })
  it('mergeFollowers', done => {
    const followers = { x: "123", y: "456" }
    const expected = {
      type: MERGE_FOLLOWERS
      , followers
    }
    expect(mergeFollowers(followers)).to.deep.eq(expected)
    done()
  })
})
