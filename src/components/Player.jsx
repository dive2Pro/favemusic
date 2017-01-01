import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { addAccessToken } from '../utils/soundcloundApi'
class Player extends Component {
  constructor(props) {
    super(props)
    this.togglePlay = this.togglePlay.bind(this)
  }

  componentDidUpdate() {
    let audioElement = ReactDOM.findDOMNode(this.refs.audio)
    if (!audioElement) return
    const { isPlaying } = this.props
    isPlaying ? audioElement.play() : audioElement.pause()
  }

  togglePlay() {
    const { togglePlayTrack, isPlaying } = this.props
    togglePlayTrack(!isPlaying)
  }

  renderNav() {
    const { isPlaying, activeTrack, activeIterateTrack} = this.props
    if (!activeTrack) return
    const { origin } = activeTrack
    const { stream_url } = origin
    return (
      <div className="player-content">
        <div>
          <i className="fa fa-step-backward"
            onClick={() => activeIterateTrack(activeTrack, -1)}  >&nbsp;</i>
        </div>
        
        <div >
          <i onClick={() => this.togglePlay()}
            className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}>&nbsp;</i>
        </div>

        <div>
          <i className="fa fa-step-forward"
            onClick={() => activeIterateTrack(activeTrack, 1)}
            >&nbsp;</i>
        </div>
        <audio ref='audio' id="audio"
          src={addAccessToken(stream_url, '?')}>
        </audio>
      </div>
    )
  }

  render() {
    const { activeTrack } = this.props
    return (
      <div className={`player ${activeTrack && 'player-visible'}`}>
        {this.renderNav()}
      </div>

    )
  }
}

export default Player