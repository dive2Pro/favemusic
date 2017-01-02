import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'
import { bindActionCreators } from 'redux'
import UserMosaic from '../components/UserMosaic'
import Activities from '../components/Activities'
import Header from '../components/Header'
import Player from '../components/Player'
import Playlist from '../components/Playlist'

class App extends Component {
  componentDidMount () {
    const { init } = this.props
    init()
  }

  render () {
    const {
      initSession, currentUser, fetchActivities, nextHref, followers,
      followings, followersNextHref, followersRequestInProcess, fetchFollowers,
      user
    } = this.props
    const e$ = Object.create(null)
    return (
      <div>
        {
          currentUser
            ? <div className="dashboard">
              <Header {...this.props} />
              <div className="dashboard-content">
                <div className="dashboard-content-main">
                  <Activities {...this.props}
                              scrollFunc={fetchActivities.bind(e$, nextHref)}
                  />
                </div>
                <div className="dashboard-content-side">
                  <UserMosaic title='Followings' collections={followings}/>
                  <UserMosaic title='Followers' collections={followers}
                              followersRequestInProcess={followersRequestInProcess}
                              followersNextHref={followersNextHref}
                              fetchFollowers={fetchFollowers}
                              user={user}
                  />
                </div>
              </div>
              <Playlist {...this.props} />
              <Player {...this.props} />
            </div>
            : <button onClick={initSession.bind(e$)}>
              Login1
            </button>
        }
      </div>
    )
  }
}
function mapStateToProps (state) {
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
    activeTrack: player.get('activeTrack'),
    playlist: player.get('playlist'),
    isOpenPlaylist: environment.get('isOpenPlaylist'),
  }
}

function mapDispathToProps (dispatch) {
  let actionCreators = bindActionCreators(actions, dispatch)
  console.info(' ')
  return actionCreators
}

const AppContainer = connect(mapStateToProps, mapDispathToProps)(App)
export default AppContainer
