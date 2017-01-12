/* eslint-disable max-len */
import React, { Component } from 'react'
import { isNotTrack, fromNow, durationFormat } from '../../services/track'
import { isSameTrackAndPlaying, isSameById } from '../../services/player.js'
import WaveFormSc from '../WaveformSc/index'
import Artwork from '../Artwork/index'
import InfoList from '../InfoList/index'
import Permalink from '../Permalink/index'
import CommentsContainer from '../Comments/index'
import { COMMENTSTYPE } from '../../constants/toggleTypes'
/* eslint-enable max-len */

class Track extends Component {

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

  renderWaveform(id, idx) {
    const { track, song } = this.state
    if (isNotTrack(song)) return (<div></div>)
    return (<WaveFormSc track={track} id={id} idx={idx} />)
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
    const {
      activateTrackF, activeTrackId
      , isPlaying, idx, deeptoggledF
    } = this.props
    const { track, song, user } = this.state
    const { origin } = song
    if (!origin) return (<div></div>)
    const {
      title, permalink_url, artwork_url, playback_count,
      comment_count, download_count, likes_count, reposts_count, id
      , duration, created_at
    } = track
    const { avatar_url, username } = user
    const isVisible = isSameById(activeTrackId)(id)
    const infoConfigurations = [
      { className: "fa fa-play", count: playback_count }
      , { className: "fa fa-heart", count: likes_count }
      , { className: "fa fa-retweet", count: reposts_count }
      , { className: "fa fa-comment", count: comment_count }
      , { className: "fa fa-download", count: download_count }
    ]
    return (
      <div className="stream">
        <div className={"track " + (isVisible ? "active" : "")}>
          <div
            onClick={() => deeptoggledF(COMMENTSTYPE, id)}
            className="track-img">
            <Artwork
              size={80} image={artwork_url} optionalImg={avatar_url}
              alt={title} />
          </div>
          <div className="track-content">
            <div className="track-content-name">
              <Permalink href={user.permalink_url} text={username} />
              <div>{fromNow(created_at)}</div>
            </div>
            <div className="track-content-meta">
              <Permalink href={permalink_url} text={title} />
              <div>{durationFormat(duration)}</div>
            </div>
            <div
              className="track-content-waveform"
              >
              {this.renderWaveform(id, idx)}
            </div>
            <InfoList infoConfigurations={infoConfigurations} />
          </div>
          {this.renderActions(track, activateTrackF, isPlaying)}
        </div >
        <CommentsContainer trackId={id} />
      </div>
    )
  }
}

export default Track
