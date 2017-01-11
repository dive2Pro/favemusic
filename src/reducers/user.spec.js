
import * as actionTypes from '../constants/actionTypes'
import { isSameById } from '../services/player'
import user from './user'

describe('User Reducer Test', () => {

  it('mergeFollowings, when there are no ids ', done => {
    const initState = {
      activitiesIds: []
      , followersIds: []
      , followingsIds: []
      , favoritesIds: []
    }
    const followings = [{ id: 'a1' }, { id: 'a2' }, { id: 'a3' }]
    const action = {
      type: actionTypes.MERGE_FOLLOWINGS
      , followings
    }
    const result = user(initState, action)
    const expected = {
      activitiesIds: []
      , followersIds: []
      , followingsIds: followings
      , favoritesIds: []
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
  it('MERGE_FAVORITES, when there are already have  ids ', done => {
    const followings = [{ id: 'a1' }, { id: 'a2' }, { id: 'a3' }]
    const favorites = [{ id: 'f1' }, { id: 'f2' }, { id: 'f3' }]
    const initState = {
      activitiesIds: []
      , followersIds: []
      , followingsIds: followings
      , favoritesIds: []
    }
    const action = {
      type: actionTypes.MERGE_FAVORITES
      , favorites
    }
    const result = user(initState, action)
    const expected = {
      activitiesIds: []
      , followersIds: []
      , followingsIds: followings
      , favoritesIds: favorites
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )

  it('ADD_TO_FAVORITES, when there are already have  ids ', done => {
    const followings = [{ id: 'a1' }, { id: 'a2' }, { id: 'a3' }]
    const favorites = [{ id: 'f1' }, { id: 'f2' }, { id: 'f3' }]
    const initState = {
      activitiesIds: []
      , followersIds: []
      , followingsIds: followings
      , favoritesIds: favorites
    }
    const addFavoritesTrack = { id: 'z1' }
    const action = {
      type: actionTypes.ADD_TO_FAVORITES
      , trackId: addFavoritesTrack
    }
    const result = user(initState, action)
    const expected = {
      activitiesIds: []
      , followersIds: []
      , followingsIds: followings
      , favoritesIds: [...favorites, addFavoritesTrack]
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
  it('REMOVE_FROM_FAVORITES, when there are already have  ids ', done => {
    const followings = ['a1', 'a2', 'a3']
    const favorites = ['f1', 'f2', 'f3']
    const initState = {
      activitiesIds: []
      , followersIds: []
      , followingsIds: followings
      , favoritesIds: favorites
    }
    const removeFavoritesTrack = 'f1'
    const action = {
      type: actionTypes.REMOVE_FROM_FAVORITES
      , trackId: removeFavoritesTrack
    }
    const result = user(initState, action)
    const expected = {
      activitiesIds: []
      , followersIds: []
      , followingsIds: followings
      , favoritesIds: favorites.slice(1)
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
  it('REMOVE_FROM_FOLLOWINGS, when there are already have  ids ', done => {
    const followings = ['a1', 'a2', 'a3']
    const favorites = ['f1', 'f2', 'f3']
    const initState = {
      activitiesIds: []
      , followersIds: []
      , followingsIds: followings
      , favoritesIds: favorites
    }
    const removeFollowingsTrack = 'a2'
    const action = {
      type: actionTypes.REMOVE_FROM_FOLLOWINGS
      , userId: removeFollowingsTrack
    }
    const result = user(initState, action)
    const expected = {
      activitiesIds: []
      , followersIds: []
      , followingsIds: ['a1', 'a3']
      , favoritesIds: favorites
    }
    expect(result).to.deep.eq(expected)
    done()
  }
  )
}
)
