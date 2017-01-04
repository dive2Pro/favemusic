// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'
import { bindActionCreators } from 'redux'
import ItemList from '../components/ItemList'
import Activities from '../components/Activities'
import HeaderContainer from './HeaderContainer'
import PlayerContainer from './PlayerContainer'
import PlaylistContainer from './PlaylistContainer'

class App extends Component {
  props: basePropsType;
  init: ()=>void

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
          <ItemList
            title="Followings"
            collections={followings}
            kind="user"
          />
          <ItemList
            title="Followers"
            collections={followers}
            requestInProcess={followersRequestInProcess}
            followersNextHref={followersNextHref}
            fetchFollowers={fetchFollowers}
            user={currentUser}
            kind="user"
          />
          <ItemList
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
            <HeaderContainer genre={this.props.genre} />
            {this.renderContent()}
            <PlaylistContainer />
            <PlayerContainer />
          </div>

        }
      </div>
    )
  }
}
function mapStateToProps(state: Object, routeState: Object) {
  const { auth, user, player } = state
  console.info(state)
  return {
    currentUser: auth.user,
    followings: user.followings,
    activities: user.activities,
    favorites: user.favorites,
    nextHref: user.activitiesNextHref,
    activitiesRequestInProcess: user.activitiesRequestInProcess,
    followersNextHref: user.followersNextHref,
    followersRequestInProcess: user.followersRequestInProcess,
    favoritesRequestInProcess: user.favoritesRequestInProcess,
    followers: user.followers,
    isPlaying: player.isPlaying,
    activeTrack: player.activeTrack,
    pathname: routeState.location.pathname
  }
}

function mapDispathToProps(dispatch: Function) {
  const actionCreators = bindActionCreators(actions, dispatch)
  console.info(' ')
  return actionCreators
}

const AppContainer = connect(mapStateToProps, mapDispathToProps)(App)
export default AppContainer
