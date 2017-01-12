import auth from './index'
import * as actionTypes from '../../constants/actionTypes'

describe('auth', () => {
  it('setSession', done => {
    const state = { user: 'hyc', session: 'session' }
    const expectdSession = 'wo de session'
    const action = {
      type: actionTypes.SET_SESSION
      , session: expectdSession
    }
    const result = auth(state, action)
    expect(result).to.deep.eq({ user: 'hyc', session: expectdSession })
    done()
  },
    it('setUser', done => {
      const state = { user: 'hyc', session: 'session' }
      const expectdUser = 'wo shi hyc'
      const action = {
        type: actionTypes.SET_USER
        , user: expectdUser
      }
      const result = auth(state, action)
      expect(result).to.deep.eq({ user: expectdUser, session: 'session' })
      done()
    })
    ,
    it('resetAuth', done => {
      const state = { user: 'hyc', session: 'session' }
      const expectd = { session: null, user: null }
      const action = {
        type: actionTypes.RESET_SESSION
        , user: 'expectdUser'
      }
      const result = auth(state, action)
      expect(result).to.deep.eq(expectd)
      done()
    })
  )
}
)
