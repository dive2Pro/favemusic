// @flow
import React from 'react'
import Actions from './Actions'
import { isSameTrackAndPlaying } from '../utils/player'

class TrackItem extends React.Component {
  props: basePropsType;

  render() {
    const { track, activateTrack, activeTrack, isPlaying, addTrackToPlaylist, likeF } = this.props
    const {
      permalink_url, artwork_url, title
      , comment_count, favoritings_count, playback_count
    } = track.origin
    const isVisible = isSameTrackAndPlaying(activeTrack, track, isPlaying)
    const configuration = [
      {
        fn: () => activateTrack(track)
        , className: `fa ${isVisible ? "fa fa-pause" : "fa fa-play"}`
      }
      , {
        fn: () => addTrackToPlaylist(track)
        , className: "fa fa-list"
      }
    ]
    return (
      <div className="item">
        <div>
          <img
            src={artwork_url}
            alt={title} height="40" width="40"
          />
        </div>
        <div className="item-content">
          <div className="item-content-name">
            <a href={permalink_url}>{title} </a>
          </div>
          <div className="item-content-info">
            <div className="item-content-info-item">
              <i className="fa fa-play">&nbsp;{playback_count}</i>
            </div>

            <div className="item-content-info-item">
              <i
                className="fa fa-heart"
                onClick={() => likeF(track)}
              > &nbsp;{favoritings_count}</i>
            </div>
            <div className="item-content-info-item">
              <i className="fa fa-comment">&nbsp;{comment_count}</i>
            </div>
          </div>
        </div>
        <Actions isVisible={isVisible} configuration={configuration} />

      </div>
    )
  }
}
export default TrackItem

