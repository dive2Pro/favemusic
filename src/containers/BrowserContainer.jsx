import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator.js'
import HeaderContainer from './HeaderContainer'
import PlayerContainer from './PlayerContainer'
import PlaylistContainer from './PlaylistContainer'
import Activities from '../components/Activities'
import { DEFAULT_GENRE } from '../constants/browse'

class BrowserContainer extends Component {
  componentDidMount() {
    const { fetchActivitiesByGenre, genre } = this.props
    fetchActivitiesByGenre("", genre)
  }

  renderInnerComopnent() {
    const {
      activitiesByGenreInProcess, activitiesByGenre, activateTrack,
      activitiesByGenreNextHref, fetchActivitiesByGenre, genre
    } = this.props
    const nextHref = activitiesByGenreNextHref.get(genre)
    return (
      <div>
        <Activities
          {...this.props}
          activities={activitiesByGenre}
          activitiesRequestInProcess={activitiesByGenreInProcess}
          activateTrack={activateTrack}
          scrollFunc={() => fetchActivitiesByGenre(nextHref, genre)}
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

function mapStateToProps(state, ownProps) {
  console.info('ownProps = ', ownProps)
  const { browse, player } = state
  return {
    activitiesByGenreInProcess: browse.get('activitiesByGenreInProcess'),
    activitiesByGenre: browse.get('activitiesByGenre'),
    activitiesByGenreNextHref: browse.get('activitiesByGenreNextHref'),
    activateTrack: player.get('activeTrack'),
    genre: ownProps.location.query.genre
  }
}

BrowserContainer.defaultProps = {
  genre: DEFAULT_GENRE
}

export default connect(mapStateToProps, actions)(BrowserContainer);
