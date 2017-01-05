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
    const { fetchActivitiesByGenre, genre, activitiesByGenreNextHref } = this.props
    const nextHref = activitiesByGenreNextHref[genre]
    fetchActivitiesByGenre(nextHref, genre)
  }

  componentDidMount() {
    if (!this.shouldFetchMoreFiltedActivities()) return
    this.fetchActivitiesByGenreFunc()
  }

  componentDidUpdate() {
    // this.fetchActivitiesByGenre()
  }

  byGenre(genre: string) {
    return (activity: ActivityType) => activity.origin.tag_list.indexOf(genre) !== -1
  }

  /**
   * need
   * @returns {boolean}
   */
  shouldFetchMoreFiltedActivities() {
    const { activitiesByGenre, genre } = this.props
    return (activitiesByGenre).filter(this.byGenre(genre)).length <= 20
  }

  renderInnerComopnent() {
    const {
      requestInProcess, activitiesByGenre, activateTrack,
      addTrackToPlaylist, genre, isPlaying
    } = this.props
    if (!activitiesByGenre) return
    const activitiesByGenreD = (activitiesByGenre)
    const filteredActivitiesByGenre = activitiesByGenreD.filter(this.byGenre(genre))
    return (
      <div>
        <Activities
          activities={filteredActivitiesByGenre}
          requestInProcess={requestInProcess}
          activateTrack={activateTrack}
          isPlaying={isPlaying}
          addTrackToPlaylist={addTrackToPlaylist}
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
  // console.info('ownProps = ', ownProps)
  const { browse, player, request } = state
  return {
    activitiesByGenre: browse.activitiesByGenre
    , activitiesByGenreNextHref: browse.activitiesByGenreNextHref
    , activateTrack: player.activeTrack
    , genre: routeState.location.query.genre
    , pathname: routeState.location.pathname
    , requestInProcess: request.requestObject[ACTIVITIES_BYGENRE]
  }
}

BrowserContainer.defaultProps = {
  genre: DEFAULT_GENRE
}
export default connect(mapStateToProps, actions)(BrowserContainer);
