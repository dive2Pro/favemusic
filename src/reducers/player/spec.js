/**
 * Created by hyc on 17-1-1.
 */
import * as actionTypes from '../../constants/actionTypes'
import { isSameById } from '../../services/player'
import player from './index'

const initialState = {
  activeTrackId: null
  , isPlaying: false
  , playlist: []
}


describe('playingTest', () => {
  it('SET_IS_PLAYING,set be not playing when there are already playing', (done: Function) => {
    const state = { isPlaying: true }
    const action = {
      type: actionTypes.SET_IS_PLAYING
      , isPlaying: false
    }
    const result = player(state, action)
    const expected = {
      isPlaying: false
    }
    expect(result).to.deep.eq(expected)
    done()
  })

  it('SET_ACTIVE_TRACK,set active_track when there are no activeTrackId', (done: Function) => {
    const activeTrackId = 'tian cai diyibu'
    const action = {
      type: actionTypes.SET_ACTIVE_TRACK
      , activeTrackId
    }
    const result = player(undefined, action)
    const expected = {
      activeTrackId
      , isPlaying: false
      , playlist: []
    }
    expect(result).to.deep.eq(expected)
    done()
  })
  it('SET_ACTIVE_TRACK,set active_track when there are already activeTrackId', (done: Function) => {
    const activeTrackId = 'tian cai diyibu'
    const expecteActiveTrackId = 'wo qu uf vs '
    const action = {
      type: actionTypes.SET_ACTIVE_TRACK
      , activeTrackId: expecteActiveTrackId
    }
    const result = player({ activeTrackId }, action)
    const expected = {
      activeTrackId: expecteActiveTrackId
    }
    expect(result).to.deep.eq(expected)
    done()
  })
  it('SET_TRACK_IN_PLAYLIST,set active_track when there are already playlist', (done: Function) => {
    const trackId = 'tian cai diyibu'
    const playlist = ['bz jy hr yy ni ', 'wo de zu guo ']
    const action = {
      type: actionTypes.SET_TRACK_IN_PLAYLIST
      , trackId
    }
    const result = player({ playlist }, action)
    const expected = {
      playlist: [...playlist, trackId]
    }
    expect(result).to.deep.eq(expected)
    done()
  })
  it('REMOVE_TRACK_FROM_PLAYLIST,remove track from playlist', (done: Function) => {
    const trackId = 'tian cai diyibu'
    const playlist = ['bz jy hr yy ni ', 'wo de zu guo ', trackId]
    const action = {
      type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST
      , trackId
    }
    const result = player({ playlist }, action)
    const expected = {
      playlist: playlist.slice(0, -1)
    }
    expect(result).to.deep.eq(expected)
    done()
  })
  it('DEACTIVE_TRACK,DEACTIVE_TRACK', (done: Function) => {
    const activeTrackId = 'tian cai diyibu'
    const playlist = ['bz jy hr yy ni ', 'wo de zu guo ', activeTrackId]
    const action = {
      type: actionTypes.DEACTIVE_TRACK
      , activeTrackId
    }
    const result = player({ playlist }, action)
    const expected = {
      playlist
      , activeTrackId: null
    }
    expect(result).to.deep.eq(expected)
    done()
  })
  it('RESET_PLAYLIST,RESET_PLAYLIST', (done: Function) => {
    const playlist = ['bz jy hr yy ni ', 'wo de zu guo ']
    const action = {
      type: actionTypes.RESET_PLAYLIST
    }
    const result = player({ playlist }, action)
    const expected = {
      playlist: []
    }
    expect(result).to.deep.eq(expected)
    done()
  })
}
)
