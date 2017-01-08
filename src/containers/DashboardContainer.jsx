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
import * as requestTypes from '../constants/requestTypes'
import * as paginateLinkTypes from '../constants/paginateLinkTypes'
import * as toggleTypes from '../constants/toggleTypes'
class App extends Component {
  props: basePropsType;
  init: () => void

  componentDidMount() {
    const { init } = this.props
    init()
  }

  renderContent() {
    const {
      currentUser
      , followersIds, followingsIds, favoritesIds
      , paginateObject
      , fetchActivities, fetchFollowingsF, fetchFollowersF, fetchFavoritesF
      , requestObject, users, tracks, toggleFollowingF
      , activitiesIds, activeTrackId
      , toggle, setToggledF
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
          <ItemList
            title="Followings"
            ids={followingsIds}
            toggleFollowingF={toggleFollowingF}
            followingsIds={followingsIds}
            kind="user"
            entities={users}
            fetchMoreF={fetchFollowingsF}
            nextHref={paginateObject[paginateLinkTypes.FOLLOWINGS]}
            requestInProcess={requestObject[requestTypes.FOLLOWINGS]}
            isExpanded={toggle[toggleTypes.FOLLOWINGSTYPE]}
            toggleExpandF={() => setToggledF(toggleTypes.FOLLOWINGSTYPE)}
            />
          <ItemList
            title="Followers"
            ids={followersIds}
            followingsIds={followingsIds}
            requestInProcess={requestObject[requestTypes.FOLLOWERS]}
            nextHref={paginateObject[paginateLinkTypes.FOLLOWERS]}
            user={currentUser}
            kind="user"
            entities={users}
            fetchMoreF={fetchFollowersF}
            toggleFollowingF={toggleFollowingF}
            isExpanded={toggle[toggleTypes.FOLLOWERSTYPE]}
            toggleExpandF={() => setToggledF(toggleTypes.FOLLOWERSTYPE)}
            />
          <ItemList
            title="Favorites"
            kind="track"
            entities={tracks}
            ids={favoritesIds}
            requestInProcess={requestObject[requestTypes.FAVORITES]}
            fetchMoreF={fetchFavoritesF}
            nextHref={paginateObject[paginateLinkTypes.FAVORITES]}
            toggleExpandF={() => setToggledF(toggleTypes.FAVORITESTYPE)}
            isExpanded={toggle[toggleTypes.FAVORITESTYPE]}
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
  const { auth, user, player, request, paginate, entities, toggle } = state
  console.info(state)
  return {
    currentUser: auth.user
    , followingsIds: user.followingsIds
    , favoritesIds: user.favoritesIds
    , followersIds: user.followersIds
    , activitiesIds: user.activitiesIds
    , requestObject: request.requestObject
    , isPlaying: player.isPlaying
    , activeTrackId: player.activeTrackId
    , paginateObject: paginate.paginateObject
    , pathname: routeState.location.pathname
    , users: entities.users
    , tracks: entities.tracks
    , songs: entities.songs
    , toggle
  }
}

function mapDispathToProps(dispatch: Function) {
  return {
    fetchActivities: bindActionCreators(actions.fetchActivities, dispatch)
    , fetchFollowingsF: bindActionCreators(actions.fetchFollowingsF, dispatch)
    , fetchFollowersF: bindActionCreators(actions.bindActionCreators, dispatch)
    , fetchFavoritesF: bindActionCreators(actions.fetchFavoritesF, dispatch)
    , toggleFollowingF: bindActionCreators(actions.toggleFollowingF, dispatch)
    , setToggledF: bindActionCreators(actions.setToggledF, dispatch)
    , init: bindActionCreators(actions.init, dispatch)
  }
}

const AppContainer = connect(mapStateToProps, mapDispathToProps)(App)
export default AppContainer
