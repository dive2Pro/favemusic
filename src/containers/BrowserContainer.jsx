// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator.js'
import HeaderContainer from './HeaderContainer'
import PlayerContainer from './PlayerContainer'
import PlaylistContainer from './PlaylistContainer'
import Activities from '../components/Activities'
import { DEFAULT_GENRE } from '../constants/genre'
import { ACTIVITIES_BYGENRE } from '../constants/requestTypes'
class BrowserContainer extends Component {
  props: basePropsType;

  fetchActivitiesByGenreFunc() {
    const { fetchActivitiesByGenre, genre, paginateObject } = this.props
    const nextHref = paginateObject[genre]
    fetchActivitiesByGenre(nextHref, genre)
  }

  componentDidMount() {
    if (!this.shouldFetchMoreFiltedActivities()) return
    this.fetchActivitiesByGenreFunc()
  }

  componentDidUpdate() {
    // this.fetchActivitiesByGenre()
  }


  /**
   * need
   * @returns {boolean}
   */
  shouldFetchMoreFiltedActivities() {
    const { activitiesByGenre, genre } = this.props
    return !activitiesByGenre[genre] || activitiesByGenre[genre].length <= 20
  }

  renderInnerComopnent() {
    const {
      requestInProcess, activitiesByGenre, genre, activeTrackId
    } = this.props
    if (!activitiesByGenre) return
    const filteredActivitiesByGenre = activitiesByGenre[genre]
    return (
      <div>
        <Activities
          activitiesIds={filteredActivitiesByGenre}
          activeTrackId={activeTrackId}
          requestInProcess={requestInProcess}
          scrollFunc={() => this.fetchActivitiesByGenreFunc()}
          />
      </div>
    )
  }

  render() {
    const { genre } = this.props
    return (
      <div>
        <HeaderContainer genre={genre} />
        {this.renderInnerComopnent()}
        <PlayerContainer />
        <PlaylistContainer />
      </div>
    );
  }
}

function mapStateToProps(state: Object, routeState: Object) {
  const { browse, entities, player, request, paginate } = state
  return {
    activitiesByGenre: browse.activitiesByGenre
    , genre: routeState.location.query.genre
    , paginateObject: paginate.paginateObject
    , activeTrackId: player.activeTrackId
    , pathname: routeState.location.pathname
    , requestInProcess: request.requestObject[ACTIVITIES_BYGENRE]
    , tracks: entities.tracks
    , songs: entities.songs
    , users: entities.users
  }
}

BrowserContainer.defaultProps = {
  genre: DEFAULT_GENRE
}
export default connect(mapStateToProps, actions)(BrowserContainer);
