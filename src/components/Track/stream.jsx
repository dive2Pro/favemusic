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
import * as sortTypes from '../../constants/sortTypes'
/* eslint-enable max-len */

class Track extends Component {

  componentWillMount() {
    const { activity, songs, users } = this.props
    const song = songs[activity.id]
    const user = users[activity.user]
    this.setState(() => {
      return {
        song
        , user
      }
    })
  }

  renderWaveform(id, idx) {
    const { song } = this.state
    const { activity } = this.props
    if (isNotTrack(song)) return (<div></div>)
    return (<WaveFormSc track={activity} id={id} idx={idx} />)
  }

  render() {
    const {
      activateTrackF, activeTrackId
      , isPlaying, idx, activity
      // , typeTracks, typeReposts
      , sortType
    } = this.props
    const { song, user } = this.state
    const { origin } = song
    if (!origin) return (<div></div>)
    const {
      title, permalink_url, artwork_url, playback_count,
      comment_count, download_count, likes_count, reposts_count, id
      , duration, created_at
    } = activity
    const { avatar_url, username } = user
    const isVisible = isSameById(activeTrackId)(id)
    const currentTrackIsPlaying = isSameTrackAndPlaying(activeTrackId, id, isPlaying)
    const artwork_clazz = classnames("fa", {
      "fa-pause": currentTrackIsPlaying
    },
      {
        "fa-play": !currentTrackIsPlaying
      }
    )
    const infoConfigurations = [
      { className: "fa fa-play", count: playback_count, activeSort: sortType === sortTypes.PLAYS }
      , { className: "fa fa-heart", count: likes_count, activeSort: sortType === sortTypes.FAVORITES }
      , { className: "fa fa-retweet", count: reposts_count, activeSort: sortType === sortTypes.REPOSTS }
      , { className: "fa fa-comment", count: comment_count }
      , { className: "fa fa-download", count: download_count }
    ]
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
            <TrackActions id={activity.id} />
          </div>
        </div >
        <CommentsContainer trackId={id} />
      </div>
    )
  }
}

export default Track
