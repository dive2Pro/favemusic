import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator.js'
import HeaderContainer from './HeaderContainer'
import PlayerContainer from './PlayerContainer'
import PlaylistContainer from './PlaylistContainer'
import Activities from '../components/Activities'

class BrowserContainer extends Component {
  componentDidMount() {
    const { fetchActivitiesByGenre } = this.props
    fetchActivitiesByGenre()
  }

  renderInnerComopnent() {
    const { activitiesByGenreInProcess, activitiesByGenre, activateTrack,
      activitiesByGenreNextHref, fetchActivitiesByGenre } = this.props
    const nextHref = activitiesByGenreNextHref.get('house')
    return (
      <div>
        <Activities
          {...this.props}
          activities={activitiesByGenre}
          activitiesRequestInProcess={activitiesByGenreInProcess}
          activateTrack={activateTrack}
          scrollFunc={() => fetchActivitiesByGenre(nextHref)}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        {this.renderInnerComopnent()}
        <PlayerContainer />
        <PlaylistContainer />
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { browse, player } = state
  return {
    activitiesByGenreInProcess: browse.get('activitiesByGenreInProcess'),
    activitiesByGenre: browse.get('activitiesByGenre'),
    activitiesByGenreNextHref: browse.get('activitiesByGenreNextHref'),
    activateTrack: player.get('activeTrack')
  }
}

export default connect(mapStateToProps, actions)(BrowserContainer);
