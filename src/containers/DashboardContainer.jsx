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
      followings, followersNextHref, followersRequestInProcess, fetchFollowers,
      favorites, favoritesRequestInProcess
    } = this.props

    return (
      <div className="dashboard-content">
        <div className="dashboard-content-main">
          <Activities
            {...this.props}
            scrollFunc={() => fetchActivities(nextHref)}
          />
        </div>
        <div className="dashboard-content-side">
          <UserMosaic
            title="Followings"
            collections={followings}
            kind="user"
          />
          <UserMosaic
            title="Followers"
            collections={followers}
            requestInProcess={followersRequestInProcess}
            followersNextHref={followersNextHref}
            fetchFollowers={fetchFollowers}
            user={currentUser}
            kind="user"
          />
          <UserMosaic
            title="Favorites"
            kind="track"
            collections={favorites}
            requestInProcess={favoritesRequestInProcess}
          />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          <div className="dashboard">
            <HeaderContainer />
            {this.renderContent()}
            <PlaylistContainer />
            <PlayerContainer />
          </div>

        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { auth, user, player } = state
  console.info(state)
  return {
    currentUser: auth.get('user'),
    followings: user.get('followings'),
    activities: user.get('activities'),
    favorites: user.get('favorites'),
    nextHref: user.get('activitiesNextHref'),
    activitiesRequestInProcess: user.get('activitiesRequestInProcess'),
    followersNextHref: user.get('followersNextHref'),
    followersRequestInProcess: user.get('followersRequestInProcess'),
    favoritesRequestInProcess: user.get('favoritesRequestInProcess'),
    followers: user.get('followers'),
    isPlaying: player.get('isPlaying'),
    activeTrack: player.get('activeTrack')
  }
}

function mapDispathToProps(dispatch) {
  const actionCreators = bindActionCreators(actions, dispatch)
  console.info(' ')
  return actionCreators
}

const AppContainer = connect(mapStateToProps, mapDispathToProps)(App)
export default AppContainer
