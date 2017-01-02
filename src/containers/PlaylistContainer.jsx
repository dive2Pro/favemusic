import React, { Component } from 'react'
import MiniTrack from '../components/MiniTrack'
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreator.js'
class Playlist extends Component {
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
      <ul>{playlist.toJSON().map((activity, idx) => {
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


function mapStateToProps(state) {
  const { player, environment } = state
  return {
    playlist: player.get('playlist'),
    isOpenPlaylist: environment.get('isOpenPlaylist'),
  }
}

export default connect(mapStateToProps, actions)(Playlist)
