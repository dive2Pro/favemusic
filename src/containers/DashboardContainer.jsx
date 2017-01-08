// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'
import { bindActionCreators } from 'redux'
import Activities from '../components/Activities'
import HeaderContainer from './HeaderContainer'
import PlayerContainer from './PlayerContainer'
import PlaylistContainer from './PlaylistContainer'
import * as requestTypes from '../constants/requestTypes'
import FollowingsList from '../components/FollowingsList'
import FollowersList from '../components/FollowersList'
import FavoritesList from '../components/FavoritesList'
class App extends Component {
  props: basePropsType;
  init: () => void

  componentDidMount() {
    const { init } = this.props
    init()
  }

  renderContent() {
    const {
      fetchActivities
      , requestObject
      , activitiesIds
      , activeTrackId
    } = this.props
    console.info(requestObject[requestTypes.FAVORITES]);
    return (
      <div className="dashboard-content">
        <div className="dashboard-content-main">
          <Activities
            activitiesIds={activitiesIds}
            activeTrackId={activeTrackId}
            requestInProcess={requestObject[requestTypes.ACTIVITIES]}
            scrollFunc={() => fetchActivities(requestObject[requestTypes.ACTIVITIES])}
            />
        </div>
        <div className="dashboard-content-side">
          <FollowingsList />
          <FollowersList />
          <FavoritesList />
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
  const { auth, user, player, request } = state
  console.info(state)
  return {
    currentUser: auth.user
    , activitiesIds: user.activitiesIds
    , requestObject: request
    , activeTrackId: player.activeTrackId
    , pathname: routeState.location.pathname
  }
}

function mapDispathToProps(dispatch: Function) {
  return {
    fetchActivities: bindActionCreators(actions.fetchActivities, dispatch)
    , init: bindActionCreators(actions.init, dispatch)
  }
}

const AppContainer = connect(mapStateToProps, mapDispathToProps)(App)
export default AppContainer
