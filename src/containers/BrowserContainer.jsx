import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator.js'
import HeaderContainer from './HeaderContainer'
import PlayerContainer from './PlayerContainer'
import PlaylistContainer from './PlaylistContainer'
import Activities from '../components/Activities'
import { DEFAULT_GENRE } from '../constants/genre'
import { dehydrate } from '../utils/immutableUtil'
type Props = {
  fetchActivitiesByGenre: (nextHref, genre)=>void,
  genre: string,
  pathname: string,
  activitiesByGenre:ImmutablePropTypes.list,
  activitiesByGenreNextHref:ImmutablePropTypes.map
}

class BrowserContainer extends Component<Props> {
  props: Props;

  fetchActivitiesByGenreFunc() {
    const { fetchActivitiesByGenre, genre, activitiesByGenreNextHref } = this.props
    const nextHref = activitiesByGenreNextHref.get(genre)
    fetchActivitiesByGenre(nextHref, genre)
  }

  componentDidMount() {
    if (!this.shouldFetchMoreFiltedActivities()) return
    this.fetchActivitiesByGenreFunc()
  }

  componentDidUpdate() {
    // this.fetchActivitiesByGenre()
  }

  byGenre(genre) {
    return (activity) => activity.origin.tag_list.indexOf(genre) !== -1
  }

  /**
   * need
   * @returns {boolean}
   */
  shouldFetchMoreFiltedActivities() {
    const { activitiesByGenre, genre } = this.props
    return dehydrate(activitiesByGenre).filter(this.byGenre(genre)).length <= 20
  }

  renderInnerComopnent() {
    const {
      activitiesByGenreInProcess, activitiesByGenre, activateTrack,
      addTrackToPlaylist, genre, isPlaying
    } = this.props
    if (!activitiesByGenre) return
    const activitiesByGenreD = dehydrate(activitiesByGenre)
    const filteredActivitiesByGenre = activitiesByGenreD.filter(this.byGenre(genre))
    return (
      <div>
        <Activities
          activities={filteredActivitiesByGenre}
          activitiesRequestInProcess={activitiesByGenreInProcess}
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

function mapStateToProps(state, routeState) {
  // console.info('ownProps = ', ownProps)
  const { browse, player } = state
  return {
    activitiesByGenreInProcess: browse.get('activitiesByGenreInProcess'),
    activitiesByGenre: browse.get('activitiesByGenre'),
    activitiesByGenreNextHref: browse.get('activitiesByGenreNextHref'),
    activateTrack: player.get('activeTrack'),
    genre: routeState.location.query.genre,
    pathname: routeState.location.pathname
  }
}

BrowserContainer.defaultProps = {
  genre: DEFAULT_GENRE
}
export default connect(mapStateToProps, actions)(BrowserContainer);
