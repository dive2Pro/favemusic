import React, { Component } from 'react'
import { connect } from 'react-redux'
import  * as actions from '../actions/actionCreator'
import { bindActionCreators } from 'redux'
class App extends Component {
  constructor (props) {
    super(props)

    this.getFollowingsDom = this.getFollowingsDom.bind(this)

  }

  getFollowingsDom () {
    const { followings } =this.props
    console.info(followings)
    return (
      <div>
        <h1>Following people</h1>
        {
          followings
          && (
            <ul>
              {followings.toJSON().map((following, idx) => {
                return (
                  <li key={idx}>
                    {following.username}
                  </li>
                )
              })}
            </ul>
          )
        }
      </div>
    )
  }

  render () {
    const { initSession, currentUser }=this.props

    return (
      <div>
        {
          currentUser
            ? <div>
              <div>{currentUser.username}</div>
              {this.getFollowingsDom()}
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
    followings: user.get('followings')
  }
}

function mapDispathToProps (dispatch) {
  let actionCreators = bindActionCreators(actions, dispatch)
  console.info(' ')
  return actionCreators
}

const AppContainer = connect(mapStateToProps, mapDispathToProps)(App)
export default AppContainer
