import React, { Component } from 'react'
import { isSameTrackAndPlaying } from '../utils/player'
export default class MiniTrack extends Component {
 
  renderImage(artwork_url, title, avatar_url) {
    return (
      <img src={artwork_url || avatar_url} alt="title" />
    )
  }
  render() {
    const {isPlaying, track,
      activeTrack, activateTrack, removeTrackFromPlaylist} = this.props
    if (!track) return
    const {origin} = track
    const {artwork_url, title, user} = origin
    const {avatar_url, permalink_url, username} = user
    const trackIsPlaying = isSameTrackAndPlaying(activeTrack, track, isPlaying)
    return (
      <div className='mini-track'>
        <div className='mini-track-img'>
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>
        <div className='mini-track-content'>
          <a href={permalink_url}>{username} - {title}</a>
        </div>

        <div className='mini-track-action'>
          <i className={`fa ${trackIsPlaying ? 'fa-pause' : 'fa-play'}`}
            onClick={() => activateTrack(track)}
            >
          </i>
        </div>
        <div className='mini-track-action'>
          <i className='fa fa-times' onClick={() => removeTrackFromPlaylist(track)}>
          </i>
        </div>
      </div>
    )
  }
}
