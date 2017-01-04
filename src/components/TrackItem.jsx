// @flow
import React from 'react'

const TrackItem = (props: { track: TrackType, idx: number }) => {
  const {
    permalink_url, artwork_url, title,
    comment_count, favoritings_count, playback_count
  } = props.track
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
            <i className="fa fa-heart">&nbsp;{favoritings_count}</i>
          </div>
          <div className="item-content-info-item">
            <i className="fa fa-comment">&nbsp;{comment_count}</i>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TrackItem

