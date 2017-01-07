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
  renderMenu = () => {
    const { clearPlayListF } = this.props
    return (
      <div className="playlist-menu">
        <div>Player Queue</div>
        <div>
          <button onClick={() => clearPlayListF()} className="inline">Clear Queue</button>
        </div>
      </div>
    )
  }

  renderPlaylist() {
    const { playlist, tracks, users } = this.props
    return (
      <ul className="playlist-content">{playlist.map((id: number, idx: number) => {
        const activity = tracks[id]
        const user = users[activity.user]
        return (
          <li key={idx}>
            <MiniTrack {...this.props} track={activity} user={user} />
          </li>
        )
      })}</ul>
    )
  }

  render() {
    return (
      <div className={`playlist ${this.couldShowPlaylist()}`}>
        {this.renderMenu()}
        {this.renderPlaylist()}
      </div>
    )
  }
}

function mapStateToProps(state: Object) {
  const { player, environment, entities } = state
  return {
    playlist: player.playlist
    , isPlaying: player.isPlaying
    , activeTrackId: player.activeTrackId
    , isOpenPlaylist: environment.isOpenPlaylist
    , tracks: entities.tracks
    , users: entities.users
  }
}

export default connect(mapStateToProps, actions)(Playlist)
