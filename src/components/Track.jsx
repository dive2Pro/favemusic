import React, { Component } from 'react'
import {
  getTrackIcon,
  normalizeSamples,
  isNotTrack,
  isJsonWaveform,
  fromNow,
  durationFormat
} from '../utils/track'
import { isSameTrackAndPlaying } from '../utils/player.js'
import Waveform from 'waveform.js'

export default class Track extends Component {

  constructor(props) {
    super(props)
    this.renderImage = this.renderImage.bind(this)
  }

  componentDidMount() {
    const { activity, idx } = this.props
    const { origin } = activity
    if (isNotTrack(activity)) return (<div></div>)
    const { waveform_url, id } = origin
    if (!waveform_url) return

    const waveform = document.getElementById('waveform-' + id + "-" + idx)
    if (isJsonWaveform(waveform_url)) {
      this.fetchJsonWaveform(waveform_url, waveform)
    }
    // todo Waveform is png
  }

  fetchJsonWaveform(waveform_url, waveform) {
    fetch(waveform_url)
      .then(response => response.json())
      .then(data => {
        new Waveform({
          container: waveform
          , innerColor: '#61B25A'
          , data: normalizeSamples(data.samples)
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderImage(artwork_url, title, avatar_url) {
    return (
      <div>
        <img src={artwork_url || avatar_url} alt={title} height="80" width="80" />
      </div>
    )
  }

  renderWaveform(id, idx) {
    return (<div id={`waveform-${id}-${idx}`} className="track-content-waveform-json"></div>)
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
          <i
            className={`fa ${currentTrackIsPlaying ? 'fa-pause' : 'fa-play'}`}
            onClick={() => activateTrack(activity)}
            />
        </div>

        <div className="track-actions-item">
          <i
            className="fa fa-list"
            onClick={() => addTrackToPlaylist(activity)}
            > </i>
        </div>
      </div>
    )
  }

  render() {
    const { activity, activateTrack, isPlaying, idx } = this.props
    const { origin, type } = activity
    if (!origin) return (<div></div>)
    const {
      user, title, permalink_url, artwork_url, playback_count,
      comment_count, download_count, likes_count, reposts_count, id
      , duration, created_at
    } = origin
    const { avatar_url, username } = user

    return (
      <div className="track">
        <div className="track-img">
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>

        <div className="track-content">
          <div className="track-content-name">
            <div><a href={user.permalink_url}>{username}></a></div>
            <div>{fromNow(created_at)}</div>
          </div>
          <div className="track-content-meta">
            <div>
              <a href={permalink_url}>
                <i className={getTrackIcon(type)}>&nbsp;{title} </i>
              </a>
            </div>
            <div>{durationFormat(duration)}</div>
          </div>
          <div className="track-content-waveform">
            {this.renderWaveform(id, idx)}
          </div>
          <div className="track-content-info">
            <div className="track-content-info-item">
              <i className="fa fa-play"> {playback_count}</i>
            </div>
            <div className="track-content-info-item">
              <i className="fa fa-heart"> {likes_count}</i>
            </div>
            <div className="track-content-info-item">
              <i className="fa fa-retweet"> {reposts_count}</i>
            </div>
            <div className="track-content-info-item">
              <i className="fa fa-comment"> {comment_count}</i>
            </div>
            <div className="track-content-info-item">
              <i className="fa fa-download"> {download_count}</i>
            </div>
          </div>
        </div>
        {this.renderActions(activity, activateTrack, isPlaying)}
      </
      div >
    )
  }
}
