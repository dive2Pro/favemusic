import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator.js'
import Activities from './Activities'
import { DEFAULT_GENRE } from '../constants/genre'
import { ACTIVITIES_BYGENRE } from '../constants/requestTypes'
import { bindActionCreators } from 'redux'

class BrowserContainer extends Component {
  props: basePropsType;

  fetchActivitiesByGenreFunc = () => {
    const { fetchActivitiesByGenre, genre, nextHref } = this.props
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
      <Activities
        activitiesIds={filteredActivitiesByGenre}
        activeTrackId={activeTrackId}
        requestInProcess={requestInProcess}
        scrollFunc={() => this.fetchActivitiesByGenreFunc()}
        />
    )
  }

  render() {
    return (
      <div>
        {this.renderInnerComopnent()}
      </div>
    );
  }
}

function mapStateToProps(state: Object, routeState: Object) {
  const { browse, entities, player, request, paginate } = state
  const genre = routeState.location.query.genre
  return {
    activitiesByGenre: browse
    , nextHref: paginate[genre]
    , activeTrackId: player.activeTrackId
    , requestInProcess: request[ACTIVITIES_BYGENRE]
    , tracks: entities.tracks
    , songs: entities.songs
    , users: entities.users
  }
}
function mapDispatchToProps(dispatch: Function) {
  return {
    fetchActivitiesByGenre: bindActionCreators(actions.fetchActivitiesByGenre, dispatch)
  }
}

BrowserContainer.defaultProps = {
  genre: DEFAULT_GENRE
}
export default connect(mapStateToProps, mapDispatchToProps)(BrowserContainer);
