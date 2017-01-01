import React, { Component } from 'react'

export default class MiniTrack extends Component {
  constructor(props) {
    super(props)
  }
  renderImage(artwork_url, title, avatar_url) {
    return (
      <img src={artwork_url || avatar_url} alt="title" />
    )
  }
  render() {
    const {isPlaying, track, togglePlayTrack,
      activeTrack, activateTrack, removeTrackFromPlaylist} = this.props
    if (!track) return
    const {origin} = track
    const {artwork_url, title, user} = origin
    const {avatar_url, permalink_url, username} = user
    const currentTrackIsActiveTrack = activeTrack && (track.origin.id === activeTrack.origin.id)
    return (
      <div className='mini-track'>
        <div className='mini-track-img'>
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>
        <div className='mini-track-content'>
          <a href={permalink_url}>{username} - {title}</a>
        </div>

        <div className='mini-track-action'>
          <i className={`fa ${currentTrackIsActiveTrack ?
            isPlaying ? 'fa-pause' : 'fa-play' : 'fa-play'}`}
            onClick={currentTrackIsActiveTrack ? togglePlayTrack.bind(null, !isPlaying)
              : activateTrack.bind(null, track)}
            >
          </i>
        </div>
        <div className='mini-track-action'>
          <i className='fa fa-times' onClick={removeTrackFromPlaylist.bind(null, track)}>
          </i>
        </div>
      </div>
    )
  }
}
