import React, { Component } from 'react'
import { getTrackIcon } from '../utils/track'
import { isActivePlayingTrack } from '../utils/player.js'
export default class Track extends Component {

  constructor(props) {
    super(props)
    this.renderImage = this.renderImage.bind(this)
  }

  renderImage(artwork_url, title, avatar_url) {
    return (
      <div>
        <img src={artwork_url || avatar_url} alt={title} />
      </div>
    )
  }
  renderOverlay(activity, activateTrack, isPlaying) {
    const {activeTrack, addTrackToPlaylist} = this.props
    const {origin} = activity
    const {stream_url} = origin
    if (!stream_url) return

    const currentTrackIsPlaying = isActivePlayingTrack(activeTrack, activity, isPlaying)

    return (
      <div className="track-img-overlay">
        <i className={`fa ${currentTrackIsPlaying ? 'fa-pause' : 'fa-play'}`}
          onClick={() => activateTrack(activity)}  > </i> 

        <i className="fa fa-list"
          onClick={() => addTrackToPlaylist(activity)}  > </i>
      </div>
    )
  }
  render() {

    const { activity, activateTrack, isPlaying} = this.props
    const { origin, type } = activity
    if (!origin) return (<div></div>)
    const { user, title, permalink_url, artwork_url } = origin
    const { avatar_url, username } = user

    return (
      <div className="track">
        <div className="track-img"
         >

          {this.renderImage(artwork_url, title, avatar_url)}

          {this.renderOverlay(activity, activateTrack, isPlaying)}

        </div>
        <div className="track-content">
          <a href={permalink_url}>
            <i className={getTrackIcon(type)}> </i> &nbsp; {username} - {title}</a>
        </div>
      </div>
    )
  }
}