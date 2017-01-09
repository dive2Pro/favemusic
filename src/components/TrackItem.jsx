// @flow
import React from 'react'
import Actions from './Actions'
import Artwork from './Artwork'
import { isSameById } from '../utils/player'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'
import InfoList from './InfoList'

const TrackItem = ({ track, activateTrackF, activeTrackId
  , addTrackToPlaylistF }: {}) => {
  const {
    permalink_url, artwork_url, title
    , comment_count, favoritings_count, playback_count
    , avatar_url
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
  const infoConfigurations = [
    { className: "fa fa-play", count: playback_count }
    , { className: "fa fa-heart", count: favoritings_count }
    , { className: "fa fa-comment", count: comment_count }
  ]
  return (
    <div className="item">
      <div>
        <Artwork size={40} image={artwork_url} optionalImg={avatar_url} alt={title} />
      </div>
      <div className="item-content">
        <div className="item-content-name">
          <a href={permalink_url}>{title} </a>
        </div>
        <InfoList infoConfigurations={infoConfigurations} />
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
