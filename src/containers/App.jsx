import React, { Component } from 'react'
import { connect } from 'react-redux'
import  * as actions from '../actions/actionCreator'
import { bindActionCreators } from 'redux'
import Followings from '../components/Followings'
import Activities from '../components/Activities'

class App extends Component {
  render () {
    const { initSession, currentUser }=this.props

    return (
      <div>
        {
          currentUser
            ? <div>
              <div>{currentUser.username}</div>
              <Followings {...this.props}/>
              <Activities {...this.props}/>
            </div>
            : <button onClick={initSession.bind(null)}>
              Login1
            </button>
        }
      </div>
    )
  }
}
function mapStateToProps (state) {
  const { auth, user }=state
  console.info(state)
  return {
    currentUser: auth.get('user'),
    followings: user.get('followings'),
    activities: user.get('activities')
  }
}

function mapDispathToProps (dispatch) {
  let actionCreators = bindActionCreators(actions, dispatch)
  console.info(' ')
  return actionCreators
}

const AppContainer = connect(mapStateToProps, mapDispathToProps)(App)
export default AppContainer
