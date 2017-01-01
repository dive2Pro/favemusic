import React, { Component } from 'react'
import MiniTrack from './MiniTrack'
export default class Playlist extends Component {
  renderPlaylist() {
    const { playlist } = this.props
    return (
      <ul>{playlist.toJSON().map((activity, idx) => {
        return (
          <li key={idx}>
            <MiniTrack {...this.props} track={activity}></MiniTrack>
          </li>
        )
      })}</ul>
    )
  }

  couldShowPlaylist() {
    const {isOpenPlaylist} = this.props
    if (isOpenPlaylist) {
      return 'playlist-visible'
    }
    return ''

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
