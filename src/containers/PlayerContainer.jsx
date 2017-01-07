// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { addAccessToken } from '../utils/soundcloundApi'
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreator.js'

class Player extends Component {
  props: basePropsType;

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio)
    if (!audioElement) return
    const { isPlaying } = this.props;
    isPlaying ? audioElement.play() : audioElement.pause()
  }

  togglePlay = () => {
    const { togglePlayTrack, isPlaying } = this.props
    togglePlayTrack(!isPlaying)
  }

  renderNav() {
    const {
      isPlaying, activeTrackId, isOpenPlaylist,
      activeIterateTrack, togglePlaylist, tracks
      , likeF
    } = this.props
    if (!activeTrackId) return
    const track = tracks[activeTrackId]
    const { stream_url, username, title } = track
    return (
      <div className="player-content">
        <div>
          <i
            className="fa fa-step-backward"
            onClick={() => activeIterateTrack(activeTrackId, -1)}
            >&nbsp;</i>
        </div>

        <div >
          <i
            onClick={() => this.togglePlay()}
            className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}
            >&nbsp;</i>
        </div>

        <div>
          <i
            className="fa fa-step-forward"
            onClick={() => activeIterateTrack(activeTrackId, 1)}
            >&nbsp;</i>
        </div>
        <div className="player-content-name">
          {username} - {title}
        </div>
        <div>
          <i
            className="fa fa-list"
            onClick={() => togglePlaylist(!isOpenPlaylist)}
            >&nbsp;</i>
        </div>
        <div>
          <i
            className={"fa fa-heart " + (track.user_favorite ? "is-favorite" : "")}
            onClick={() => likeF(track)}
            >

          </i>
        </div>
        <audio
          ref="audio" id="audio"
          src={addAccessToken(stream_url, '?')}
          >
        </audio>
      </div >
    )
  }

  render() {
    const { activeTrackId } = this.props
    return (
      <div className={`player ${activeTrackId && 'player-visible'}`}>
        {this.renderNav()}
      </div>

    )
  }
}

function mapStateToProps(state: Object) {
  const { player, environment, entities } = state
  return {
    isPlaying: player.isPlaying
    , activeTrackId: player.activeTrackId
    , isOpenPlaylist: environment.isOpenPlaylist
    , tracks: entities.tracks
  }
}

export default connect(mapStateToProps, actions)(Player)
