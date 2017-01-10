import { MERGE_ACTIVITIES } from '../constants/actionTypes'
import { mergeActivities } from './user'
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
})
