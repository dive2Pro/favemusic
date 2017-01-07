
/* eslint-disable max-len */
import React, { Component } from 'react'
import { getTrackIcon, normalizeSamples, isNotTrack, isJsonWaveform, fromNow, durationFormat } from '../utils/track'
import { isSameTrackAndPlaying, isSameById } from '../utils/player.js'
import Waveform from 'waveform.js'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'
/* eslint-enable max-len */

class Track extends Component {

  constructor(props) {
    super(props)
    this.renderImage = this.renderImage.bind(this)
  }

  componentWillMount() {
    const { tracks, songs, users, id } = this.props
    const song = songs[id]
    const track = tracks[song.id]
    const user = users[track.user]
    this.setState(() => {
      return {
        song
        , track
        , user
      }
    })
  }

  componentDidMount() {
    const { track, song } = this.state
    const { idx } = this.props
    if (isNotTrack(song)) return (<div></div>)
    const { waveform_url, id } = track
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

  renderActions(track, activateTrackF, isPlaying) {
    const { activeTrackId, addTrackToPlaylistF, id } = this.props
    const { stream_url } = track
    if (!stream_url) return

    const currentTrackIsPlaying = isSameTrackAndPlaying(activeTrackId, id, isPlaying)
    return (
      <div className="track-actions">
        <div className="track-actions-item">
          <i
            className={`fa ${currentTrackIsPlaying ? 'fa-pause' : 'fa-play'}`}
            onClick={() => activateTrackF(track.id)}
            />
        </div>

        <div className="track-actions-item">
          <i
            className="fa fa-list"
            onClick={() => addTrackToPlaylistF(track.id)}
            > </i>
        </div>
      </div>
    )
  }

  render() {
    const { activateTrackF, activeTrackId
      , isPlaying, idx } = this.props
    const { track, song, user } = this.state
    const { origin, type } = song

    if (!origin) return (<div></div>)
    const {
      title, permalink_url, artwork_url, playback_count,
      comment_count, download_count, likes_count, reposts_count, id
      , duration, created_at
    } = track
    const { avatar_url, username } = user
    const isVisible = isSameById(activeTrackId)(id)
    return (
      <div className={"track " + (isVisible ? "active" : "")}>
        <div className="track-img">
          {this.renderImage(artwork_url, title, avatar_url)}
        </div>

        <div className="track-content">
          <div className="track-content-name">
            <div>
              <a href={user.permalink_url}>
                {username}
              </a>
            </div>
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
        {this.renderActions(track, activateTrackF, isPlaying)}
      </
      div >
    )
  }
}

function mapStateToProps(state, ownState) {
  return {
    ids: ownState.ids
    , id: ownState.id
    , tracks: state.entities.tracks
    , users: state.entities.users
    , songs: state.entities.songs
    , isPlaying: state.player.isPlaying
  }
}

export default connect(mapStateToProps, actions)(Track)

