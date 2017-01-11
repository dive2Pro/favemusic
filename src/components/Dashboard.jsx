// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'
import { bindActionCreators } from 'redux'
import Activities from './Activities'
import * as requestTypes from '../constants/requestTypes'
import FollowingsList from './FollowingsList'
import FollowersList from './FollowersList'
import FavoritesList from './FavoritesList'
class App extends Component {
  props: basePropsType;
  init: () => void

  componentDidMount() {
    const { init } = this.props
    init()
  }

  renderContent = () => {

  }

  render() {
    const {
      fetchActivities
      , requestObject
      , activitiesIds
      , activeTrackId
    } = this.props
    return (
      <div className="dashboard">
        <div className="dashboard-main">
          <Activities
            activitiesIds={activitiesIds}
            activeTrackId={activeTrackId}
            requestInProcess={requestObject[requestTypes.ACTIVITIES]}
            scrollFunc={() => fetchActivities(requestObject[requestTypes.ACTIVITIES])}
            />
        </div>
        <div className="dashboard-side">
          <FollowingsList />
          <FollowersList />
          <FavoritesList />
        </div>
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
