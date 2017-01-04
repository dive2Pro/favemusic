// @flow
import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import MiniTrack from '../components/MiniTrack'
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreator.js'
type PropsType = {
  activeTrack: React.PropTypes.object,
  isPlaying: React.PropTypes.bool,
  playlist: ImmutablePropTypes.list,
  isOpenPlaylist: React.PropTypes.bool
};

class Playlist extends Component {
  props: PropsType;

  couldShowPlaylist() {
    const { isOpenPlaylist } = this.props
    if (isOpenPlaylist) {
      return 'playlist-visible'
    }
    return ''
  }

  renderPlaylist() {
    const { playlist } = this.props
    return (
      <ul>{playlist.toJSON().map((activity: Object, idx: number) => {
        return (
          <li key={idx}>
            <MiniTrack {...this.props} track={activity} />
          </li>
        )
      })}</ul>
    )
  }

  render() {
    return (
      <div className={`playlist ${this.couldShowPlaylist()}`}>
        <div className="playlist-content">

          {this.renderPlaylist()}

        </div>
      </div>
    )
  }
}

function mapStateToProps(state: Object) {
  const { player, environment } = state
  return {
    playlist: player.get('playlist'),
    isPlaying: player.get('isPlaying'),
    activeTrack: player.get('activeTrack'),
    isOpenPlaylist: environment.get('isOpenPlaylist'),
  }
}

export default connect(mapStateToProps, actions)(Playlist)
