// @flow
import React from 'react'
import Actions from './Actions'
import Artwork from './Artwork'
import { isSameById } from '../services/player'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'
import InfoList from './InfoList'
import { bindActionCreators } from 'redux'
import Permalink from './Permalink'

const TrackItem = ({
  track, activateTrackF, activeTrackId
  , addTrackToPlaylistF
}: { }) => {
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
        <Permalink href={permalink_url} text={title} />
        <InfoList infoConfigurations={infoConfigurations} />
      </div>
      <Actions isVisible={isVisible} configuration={configuration} />

    </div>
  )
}

function mapStateToProps(state: baseStateType, ownState: {}) {
  return {
    track: ownState.track
    , idx: ownState.idx
    , isPlaying: state.player.isPlaying
    , activeTrackId: state.player.activeTrackId
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
    activateTrackF: bindActionCreators(actions.activateTrackF, dispatch)
    , addTrackToPlaylistF: bindActionCreators(actions.addTrackToPlaylistF, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TrackItem)
