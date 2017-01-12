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
import { ACTIVITIES } from '../constants/paginateLinkTypes.js'
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
      , requestInProcess
      , activitiesIds
      , activeTrackId
      , nextHref
    } = this.props
    return (
      <div className="dashboard">
        <div className="dashboard-main">
          <Activities
            activitiesIds={activitiesIds}
            activeTrackId={activeTrackId}
            requestInProcess={requestInProcess}
            scrollFunc={() => fetchActivities(nextHref)}
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

function mapStateToProps(state: Object) {
  const { auth, user, player, request, paginate } = state
  console.info(state)
  return {
    currentUser: auth.user
    , activitiesIds: user.activitiesIds
    , requestInProcess: request[requestTypes.ACTIVITIES]
    , activeTrackId: player.activeTrackId
    , nextHref: paginate[ACTIVITIES]
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
