import React, { Component } from 'react'
import { getTrackIcon, normalizeSamples, isNotTrack } from '../utils/track'
import { isSameTrackAndPlaying } from '../utils/player.js'
import Waveform from 'waveform.js';
export default class Track extends Component {

  constructor(props) {
    super(props)
    this.renderImage = this.renderImage.bind(this)
  }

  renderImage(artwork_url, title, avatar_url) {
    return (
      <div>
        <img src={artwork_url || avatar_url} alt={title} height='90' width='90' />
      </div>
    )
  }

  renderActions(activity, activateTrack, isPlaying) {
    const { activeTrack, addTrackToPlaylist } = this.props
    const { origin } = activity
    const { stream_url } = origin
    if (!stream_url) return

    const currentTrackIsPlaying = isSameTrackAndPlaying(activeTrack, activity, isPlaying)

    return (
      <div className="track-actions">
        <div className="track-actions-item">
          <i className={`fa ${currentTrackIsPlaying ? 'fa-pause' : 'fa-play'}`}
            onClick={() => activateTrack(activity)}> </i>
        </div>

        <div className="track-actions-item">
          <i className="fa fa-list"
            onClick={() => addTrackToPlaylist(activity)}> </i>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { activity, activateTrack, isPlaying, idx } = this.props
    const { origin, type } = activity
    if (isNotTrack(activity)) return (<div></div>)
    const { waveform_url, id } = origin
    if (!waveform_url) return

    const waveform = document.getElementById('waveform-' + idx)

    fetch(waveform_url)
      .then(response => response.json())
      .then(data => {
        new Waveform({
          container: waveform,
          innerColor: '#61B25A',
          data: normalizeSamples(data.samples)
        })
      }).catch(err => {
        console.log(err);
      })
  }

  render() {

    const { activity, activateTrack, isPlaying, idx } = this.props
    const { origin, type } = activity
    if (!origin) return (<div></div>)
    const { user, title, permalink_url, artwork_url, playback_count,
      comment_count, download_count, likes_count, reposts_count} = origin
    const { avatar_url, username } = user

    return (
      <div className="track">
        <div className="track-img"
          >
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>

        <div className="track-content">
          <a href={permalink_url}>
            <i className={getTrackIcon(type)}> </i> &nbsp; {username} - {title}</a>
          <div id={`waveform-${idx}`} className="track-content-waveform"></div>
          <div className='track-content-info'>
            <div className='track-content-info-item'>
              <i className='fa fa-play'> {playback_count}</i>
            </div>
            <div className='track-content-info-item'>
              <i className='fa fa-heart'> {likes_count}</i>
            </div>
            <div className='track-content-info-item'>
              <i className='fa fa-retweet'> {reposts_count}</i>
            </div>
            <div className='track-content-info-item'>
              <i className='fa fa-comment'> {comment_count}</i>
            </div>
            <div className='track-content-info-item'>
              <i className='fa fa-download'> {download_count}</i>
            </div>
          </div>
        </div>
        {this.renderActions(activity, activateTrack, isPlaying)}
      </div>
    )
  }
}