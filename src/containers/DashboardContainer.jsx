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
      , followersIds, followingsIds, favorites
      , paginateObject
      , fetchActivities, fetchFollowingsF, fetchFollowersF, fetchFavoritesF
      , requestObject
      , userEntities
    } = this.props

    return (
      <div className="dashboard-content">
        <div className="dashboard-content-main">
          <Activities
            {...this.props}
            requestInProcess={requestObject[requestTypes.ACTIVITIES]}
            scrollFunc={() => fetchActivities(requestObject[requestTypes.ACTIVITIES])}
            />
        </div>
        <div className="dashboard-content-side">
          <ItemList
            title="Followings"
            ids={followingsIds}
            kind="user"
            entities={userEntities}
            fetchMoreF={fetchFollowingsF}
            nextHref={paginateObject[paginateLinkTypes.FOLLOWINGS]}
            requestInProcess={requestObject[requestTypes.FOLLOWINGS]}
            />
          <ItemList
            title="Followers"
            ids={followersIds}
            requestInProcess={requestObject[requestTypes.FOLLOWERS]}
            nextHref={paginateObject[paginateLinkTypes.FOLLOWERS]}
            fetchMoreF={fetchFollowersF}
            user={currentUser}
            kind="user"
            entities={userEntities}
            />
          <ItemList
            title="Favorites"
            kind="track"
            collections={favorites}
            requestInProcess={requestObject[requestTypes.FAVORITES]}
            fetchMoreF={fetchFavoritesF}
            nextHref={paginateObject[paginateLinkTypes.FAVORITES]}
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
  const { auth, user, player, request, paginate, userEntities } = state
  console.info(state)
  return {
    currentUser: auth.user
    , followingsIds: user.followingsIds
    , activities: user.activities
    , favorites: user.favorites
    , requestObject: request.requestObject
    , followersIds: user.followersIds
    , isPlaying: player.isPlaying
    , activeTrack: player.activeTrack
    , paginateObject: paginate.paginateObject
    , pathname: routeState.location.pathname
    , userEntities
  }
}

function mapDispathToProps(dispatch: Function) {
  const actionCreators = bindActionCreators(actions, dispatch)
  console.info(' ')
  return actionCreators
}

const AppContainer = connect(mapStateToProps, mapDispathToProps)(App)
export default AppContainer
