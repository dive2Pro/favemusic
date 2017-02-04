// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { addAccessToken } from '../../services/soundcloundApi'
import { connect } from 'react-redux';
import * as actions from '../../actions/actionCreator.js'
import { PLAYLISTTYPE, ADJUSTVOLUME } from '../../constants/toggleTypes'
import { bindActionCreators } from 'redux'
import { ButtonInline } from '../ButtonInline/index'


class Player extends Component {
  props: basePropsType;
  setAudioVolume = () => { }

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio)
    if (!audioElement) return
    const { isPlaying, isMute, audioValue } = this.props;
    this.setAudioVolume(audioElement)
    audioElement.muted = isMute
    audioElement.volume = audioValue
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
      , isLogined, playCount
      , toggleShuffleMode, isShuffleMode
      , isOpenPlaylist
    } = this.props
    if (!activeTrackId) return
    const track = tracks[activeTrackId]
    const { stream_url, username, title } = track
    return (
      <div className="player-content">
        <div className="player-content-action">
          <ButtonInline onClick={() => activeIterateTrack(activeTrackId, -1)} >
            <i className="fa fa-step-backward">&nbsp;</i>
          </ButtonInline>
        </div>
        <div className="player-content-action" >
          <ButtonInline onClick={() => this.togglePlay()} >
            <i
              className={`fa ${isPlaying ? 'fa-pause' : 'fa-play'}`}>
              &nbsp;
            </i>
          </ButtonInline>
        </div>
        <div className="player-content-action">
          <ButtonInline
            onClick={() => activeIterateTrack(activeTrackId, 1)}
            >
            <i className="fa fa-step-forward">&nbsp;</i>
          </ButtonInline>
        </div>
        <div className="player-content-name">
          {username} - {title}
        </div>
        <div className="player-content-action">
          <ButtonInline
            onClick={() => setToggledF(PLAYLISTTYPE)}
            >
            <i className={"fa fa-list " + (isOpenPlaylist ? " is-favorite" : "")}>&nbsp;</i>
            {playCount}
          </ButtonInline>
        </div>
        <div className="player-content-action">
          <ButtonInline
            onClick={() => toggleShuffleMode(!isShuffleMode)}
          >
            <i className={"fa fa-random " + (isShuffleMode ? "is-favorite" : "")} />
          </ButtonInline>
        </div>
        <div className="player-content-action">
          <ButtonInline onClick={() => setToggledF(ADJUSTVOLUME)}>
            <i className="fa fa-volume-up"> </i>
          </ButtonInline>
        </div>
        {isLogined && (<div className="player-content-action">
          <ButtonInline
            onClick={() => likeF(track)}
            >
            <i className={"fa fa-heart " + (track.user_favorite ? "is-favorite" : "")}>
            </i>
          </ButtonInline>
        </div>)}
        <audio
          ref={(audio: Audio) => { this.audio = audio }} id="audio"
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
  const { player, auth, entities, toggle } = state
  return {
    isPlaying: player.isPlaying
    , activeTrackId: player.activeTrackId
    , tracks: entities.tracks
    , isLogined: auth.user !== null
    , playCount: player.playlist.length
    , isShuffleMode: player.isShuffleMode
    , isOpenPlaylist: toggle[PLAYLISTTYPE]
    , audioValue: player.audioValue
    , isMute: player.isMute
  }
}
function mapDispatchToProps(dispatch: Function) {
  return {
    likeF: bindActionCreators(actions.likeF, dispatch)
    , activeIterateTrack: bindActionCreators(actions.activeIterateTrack, dispatch)
    , setToggledF: bindActionCreators(actions.setToggledF, dispatch)
    , togglePlayTrack: bindActionCreators(actions.togglePlayTrack, dispatch)
    , toggleShuffleMode: bindActionCreators(actions.toggleShuffleMode, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Player)
