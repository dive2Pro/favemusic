// @flow
import * as actionTypes from '../constants/actionTypes'
import browse from './browse'

describe('browseTest', () => {
  it('MERGE_ACTIVITIES_BY_GENRE,when there are already activitiesIds', (done: Function) => {
    const state = { hello: 'world' }
    const genre = 'fu wu qi'
    const activitiesIds = [1, 2, 3, 4, 5]
    const action = {
      type: actionTypes.MERGE_ACTIVITIES_BY_GENRE
      , genre
      , activitiesIds
    }
    const result = browse(state, action)
    const expected = {
      hello: 'world'
      , [genre]: activitiesIds

    }
    expect(result).to.deep.eq(expected)
    done()
  })
  it('MERGE_ACTIVITIES_BY_GENRE,when there are no  activitiesIds yet ', (done: Function) => {
    const genre = 'fu wu qi'
    const activitiesIds = [1, 2, 3, 4, 5]
    const action = {
      type: actionTypes.MERGE_ACTIVITIES_BY_GENRE
      , genre
      , activitiesIds
    }
    const result = browse(undefined, action)
    const expected = {

      [genre]: activitiesIds

    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
  it('MERGE_ACTIVITIES_BY_GENRE,side by side', (done: Function) => {
    const genre = 'fu wu qi'
    const preAcitviesIds = [{ aiya: 'holo' }, { hello: 'world' }]
    const state = { [genre]: preAcitviesIds }
    const activitiesIds = [1, 2, 3, 4, 5]
    const action = {
      type: actionTypes.MERGE_ACTIVITIES_BY_GENRE
      , genre
      , activitiesIds
    }
    const result = browse(state, action)
    const expected = {
      [genre]: [...preAcitviesIds, ...activitiesIds]
    }
    console.log(result)
    expect(result).to.deep.eq(expected)
    done()
  }
  )
}
)
