import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/actionCreator.js'
import Activities from '../Activities/index'
import { DEFAULT_GENRE } from '../../constants/genre'
import { ACTIVITIES_BYGENRE } from '../../constants/requestTypes'
import { bindActionCreators } from 'redux'
import { SORTFUNCTIONS } from '../../constants/sort'
import * as sortTypes from '../../constants/sortTypes'
import { DURATION_FILTER_FUNCTIONS } from '../../constants/durationFilter'
import { ALL } from '../../constants/filterTypes'

class BrowserContainer extends Component {
  props: basePropsType;

  fetchActivitiesByGenreFunc = () => {
    if (!this.shouldFetchMoreFiltedActivities()) return
    const { fetchActivitiesByGenre, genre, nextHref } = this.props
    fetchActivitiesByGenre(nextHref, genre)
  }

  componentDidMount() {
    this.fetchActivitiesByGenreFunc()
  }

  componentDidUpdate() {
    this.fetchActivitiesByGenreFunc()
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
      requestInProcess, activitiesByGenre
      , genre, trackEntities
    } = this.props
    if (!activitiesByGenre) {
      return
    }
    const filteredActivitiesByGenre = activitiesByGenre[genre]
    return (
      <Activities
        activitiesIds={filteredActivitiesByGenre}
        requestInProcess={requestInProcess}
        scrollFunc={() => this.fetchActivitiesByGenreFunc()}
        trackEntities={trackEntities}
        activeFilter={DURATION_FILTER_FUNCTIONS[ALL]}
        sortFunc={SORTFUNCTIONS[sortTypes.NONE]}
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
  const { browse, entities, request, paginate } = state
  let genre = routeState.location.query.genre
  genre = genre && genre.trim().replace(' ', '')
  return {
    activitiesByGenre: browse
    , nextHref: paginate[genre]
    , genre
    , requestInProcess: request[ACTIVITIES_BYGENRE]
    , trackEntities: entities.tracks
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
