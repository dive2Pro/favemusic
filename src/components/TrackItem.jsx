// @flow
import React from 'react'
import Actions from './Actions'
import { isSameById } from '../utils/player'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'

const TrackItem = ({ track, activateTrackF, activeTrackId
  , isPlaying, addTrackToPlaylistF, likeF }: {}) => {
  const {
    permalink_url, artwork_url, title
    , comment_count, favoritings_count, playback_count
  } = track

  const isVisible = isSameById(activeTrackId)(track.id)
  const configuration = [
    {
      fn: () => activateTrackF(track.id)
      , className: `fa ${isVisible ? "fa fa-pause" : "fa fa-play"}`
    }
    , {
      fn: () => addTrackToPlaylistF(track.id)
      , className: "fa fa-list"
    }
  ]
  return (
    <div className="item">
      <div>
        <img
          className={isPlaying}
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


function matpStateToProps(state: baseStateType, ownState: {}) {
  return {
    track: ownState.track
    , idx: ownState.idx
    , isPlaying: state.player.isPlaying
    , activeTrackId: state.player.activeTrackId
  }
}

export default connect(matpStateToProps, actions)(TrackItem)
