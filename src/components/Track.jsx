import React, { Component } from 'react'
import { getTrackIcon } from '../utils/track'
export default class Track extends Component {

  constructor (props) {
    super(props)
    this.renderImage = this.renderImage.bind(this)
  }

  renderImage (artwork_url, title, avatar_url) {
    return (
      <div>
        <img src={artwork_url || avatar_url} alt={title}/>
      </div>
    )
  }

  render () {

    const { activity } =this.props
    const { origin, type }=activity
    if (!origin)return (<div></div>)
    const { user, title, permalink_url, artwork_url } =origin
    const { avatar_url, username }=user

    return (
      <div className="track">
        <div className="track-img">
          {this.renderImage(artwork_url, title, avatar_url)}
          <div className="track-img-overlay">
            <i className="fa fa-play"> </i>
          </div>
        </div>
        <div className="track-content">
          <a href={permalink_url}>
            <i className={getTrackIcon(type)}></i> &nbsp; {username} - {title}</a>
        </div>
      </div>
    )
  }
}