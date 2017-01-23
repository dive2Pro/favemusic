/* eslint-disable max-len */
import React, { Component } from 'react'
import { isNotTrack, fromNow, durationFormat } from '../../services/track'
import { isSameTrackAndPlaying, isSameById } from '../../services/player.js'
import WaveFormSc from '../WaveformSc/index'
import Artwork from '../Artwork/index'
import InfoList from '../InfoList/index'
import Permalink from '../Permalink/index'
import CommentsContainer from '../Comments/index'
import ArtworkAction from '../ArtworkAction/index'
import classnames from 'classnames'
import TrackActions from '../TrackActions/index'
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

  render() {
    const {
      activateTrackF, activeTrackId
      , isPlaying, idx
      // , typeTracks, typeReposts
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
    const currentTrackIsPlaying = isSameTrackAndPlaying(activeTrackId, id, isPlaying)
    const artwork_clazz = classnames("fa", {
      "fa-pause": currentTrackIsPlaying
    },
      {
        "fa-play": !currentTrackIsPlaying
      }
    )
    return (
      <div className="stream">
        <div className={"track " + (isVisible ? "active" : "")}>
          <div className="track-artwork">
            <ArtworkAction
              isVisible={isVisible}
              className={artwork_clazz}
              action={() => activateTrackF(id)}
              >
              <Artwork
                size={80} image={artwork_url} optionalImg={avatar_url}
                alt={title} />
            </ArtworkAction></div>
          <div className="track-content">
            <div className="track-content-name">
              <Permalink href={user.permalink_url} text={username} />
              - <Permalink href={permalink_url} text={title} />
            </div>
            <div
              className="track-content-waveform"
              >
              {this.renderWaveform(id, idx)}
            </div>
            <InfoList infoConfigurations={infoConfigurations} />
          </div>
          <div className="track-meta">
            <div className="track-meta-info">
              <div>{fromNow(created_at)}/{durationFormat(duration)}</div>
            </div>
            <TrackActions id={track.id} />
          </div>
        </div >
        <CommentsContainer trackId={id} />
      </div>
    )
  }
}

export default Track
