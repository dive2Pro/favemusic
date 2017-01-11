// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { addAccessToken } from '../services/soundcloundApi'
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreator.js'
import { PLAYLISTTYPE } from '../constants/toggleTypes'
import { bindActionCreators } from 'redux'

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
      isPlaying, activeTrackId,
      activeIterateTrack, tracks
      , likeF, setToggledF
      , isLogined
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
            onClick={() => setToggledF(PLAYLISTTYPE)}
            >&nbsp;</i>
        </div>
        {isLogined && (<div>
          <i
            className={"fa fa-heart " + (track.user_favorite ? "is-favorite" : "")}
            onClick={() => likeF(track)}
            >
          </i>
        </div>)}
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
  const { player, auth, entities } = state
  return {
    isPlaying: player.isPlaying
    , activeTrackId: player.activeTrackId
    , tracks: entities.tracks
    , isLogined: auth.user !== null
  }
}
function mapDispatchToProps(dispatch: Function) {
  return {
    likeF: bindActionCreators(actions.likeF, dispatch)
    , activeIterateTrack: bindActionCreators(actions.activeIterateTrack, dispatch)
    , setToggledF: bindActionCreators(actions.setToggledF, dispatch)
    , togglePlayTrack: bindActionCreators(actions.togglePlayTrack, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Player)
