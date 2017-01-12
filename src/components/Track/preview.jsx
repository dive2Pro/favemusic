// @flow
import React from 'react'
import Actions from '../HoverActions/index'
import Artwork from '../Artwork/index'
import { isSameById } from '../../services/player'
import InfoList from '../InfoList/index'
import Permalink from '../Permalink/index'

const TrackItem = ({
  track, activateTrackF, activeTrackId
  , addTrackToPlaylistF
}: {}) => {
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

export default TrackItem
