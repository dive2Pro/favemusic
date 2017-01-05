// @flow
import React, { Component } from 'react'
import MiniTrack from '../components/MiniTrack'
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreator.js'
type PropsType = {
  activeTrack: Object,
  isPlaying: boolean,
  playlist: Array<TrackType>,
  isOpenPlaylist: boolean
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
      <ul>{playlist.map((activity: Object, idx: number) => {
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
    playlist: player.playlist
    , isPlaying: player.isPlaying
    , activeTrack: player.activeTrack
    , isOpenPlaylist: environment.isOpenPlaylist,
  }
}

export default connect(mapStateToProps, actions)(Playlist)
