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
    const { isPlaying, activateTrackF, activeTrackId, track
      , removeTrackFromPlaylistF } = this.props
    const { id } = track
    const isVisibleAndPlay = isSameTrackAndPlaying(activeTrackId, id, isPlaying)
    const isVisible = isSameTrack(activeTrackId)(id)
    const configuration = [
      {
        fn: () => activateTrackF(id)
        , className: `fa ${isVisibleAndPlay ? 'fa-pause' : 'fa-play'}`
      }
      , {
        fn: () => removeTrackFromPlaylistF(id)
        , className: "fa fa-times"
      }
    ]
    return (
      <Actions isVisible={isVisible} configuration={configuration} />
    )
  }

  render() {
    const { track, activeTrackId, user } = this.props
    if (!track) return
    const { artwork_url, title } = track
    const { avatar_url, permalink_url, username } = user
    const isSame = isSameTrack(activeTrackId)(track.id)
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
