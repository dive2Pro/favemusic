import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'
import { bindActionCreators } from 'redux'
import UserMosaic from '../components/UserMosaic'
import Activities from '../components/Activities'
import HeaderContainer from './HeaderContainer'
import PlayerContainer from './PlayerContainer'
import PlaylistContainer from './PlaylistContainer'

class App extends Component {
  componentDidMount() {
    const { init } = this.props
    init()
  }

  renderContent() {
    const {
      currentUser, fetchActivities, nextHref, followers,
      followings, followersNextHref, followersRequestInProcess, fetchFollowers
    } = this.props

    return (
      <div className="dashboard-content">
        <div className="dashboard-content-main">
          <Activities {...this.props}
            scrollFunc={() => fetchActivities(nextHref)}
            />
        </div>
        <div className="dashboard-content-side">
          <UserMosaic title='Followings' collections={followings} />
          <UserMosaic title='Followers' collections={followers}
            followersRequestInProcess={followersRequestInProcess}
            followersNextHref={followersNextHref}
            fetchFollowers={fetchFollowers}
            user={currentUser}
            />
        </div>
      </div>
    )
  }

  render() {
    const { currentUser
    } = this.props
    return (
      <div>
        {
          <div className="dashboard">
            <HeaderContainer {...this.props} />
            {this.renderContent()}
            <PlaylistContainer {...this.props} />
            <PlayerContainer {...this.props} />
          </div>

        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { auth, user, player, environment } = state
  console.info(state)
  return {
    currentUser: auth.get('user'),
    followings: user.get('followings'),
    activities: user.get('activities'),
    nextHref: user.get('activitiesNextHref'),
    activitiesRequestInProcess: user.get('activitiesRequestInProcess'),
    followersNextHref: user.get('followersNextHref'),
    followersRequestInProcess: user.get('followersRequestInProcess'),
    followers: user.get('followers'),
    isPlaying: player.get('isPlaying'),
    activeTrack: player.get('activeTrack')
  }
}

function mapDispathToProps(dispatch) {
  let actionCreators = bindActionCreators(actions, dispatch)
  console.info(' ')
  return actionCreators
}

const AppContainer = connect(mapStateToProps, mapDispathToProps)(App)
export default AppContainer
