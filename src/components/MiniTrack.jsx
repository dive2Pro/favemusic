import React, { Component } from 'react'
import { isSameTrackAndPlaying, isSameTrack } from '../utils/player'
import Actions from './Actions'

export default class MiniTrack extends Component {

  renderImage(artwork_url, title, avatar_url) {
    return (
      <img src={artwork_url || avatar_url} alt="title" height="40" width="40" />
    )
  }

  renderActions() {
    const { isPlaying, activateTrack, activeTrack, track, removeTrackFromPlaylist } = this.props
    const isVisible = isSameTrackAndPlaying(activeTrack, track, isPlaying)
    const configuration = [
      {
        fn: () => activateTrack(track),
        className: `fa ${isVisible ? 'fa-pause' : 'fa-play'}`
      },
      {
        fn: () => removeTrackFromPlaylist(track),
        className: "fa fa-times"
      }
    ]
    return (
      <Actions isVisible={isVisible} configuration={configuration} />
    )
  }

  render() {
    const { track, activeTrack } = this.props
    if (!track) return
    const { origin } = track
    const { artwork_url, title, user } = origin
    const { avatar_url, permalink_url, username } = user
    const isSame = isSameTrack(activeTrack)(track)
    return (
      <div className={`mini-track ${isSame ? 'active-track' : ''}`}>
        <div className="mini-track-img">
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>
        <div className="mini-track-content">
          <div className="mini-track-content-name">
            <a href={permalink_url}>{username} - {title}</a>
          </div>
          {this.renderActions()}
        </div>
      </div>
    )
  }
}
