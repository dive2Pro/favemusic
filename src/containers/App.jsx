import React, { Component } from 'react'
import { connect } from 'react-redux'
import  * as actions from '../actions/actionCreator'
import { bindActionCreators } from 'redux'
import Followings from '../components/Followings'
import Activities  from '../components/Activities'
import FetchOnScroll  from '../components/FetchOnScroll'

class App extends Component {
  render () {
    const { initSession, currentUser, fetchActivities, nextHref }=this.props
     return (
      <div>
        {
          currentUser
            ? <div className="dashboard-content">
              <div className="dashboard-content-main">

              <Activities {...this.props}
                          scrollFunc={fetchActivities.bind(null, nextHref)}
              />
              </div>

              <div className="dashboard-content-side">

                <Followings
                  {...this.props}
                />

              </div>
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
    activities: user.get('activities'),
    nextHref: user.get('activitiesNextHref'),
    activitiesRequestInProcess: user.get('activitiesRequestInProcess')
  }
}

function mapDispathToProps (dispatch) {
  let actionCreators = bindActionCreators(actions, dispatch)
  console.info(' ')
  return actionCreators
}

const AppContainer = connect(mapStateToProps, mapDispathToProps)(App)
export default AppContainer
