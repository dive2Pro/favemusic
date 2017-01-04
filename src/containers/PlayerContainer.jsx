// @flow
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { addAccessToken } from '../utils/soundcloundApi'
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreator.js'

type PropsType = {
  isPlaying: boolean,
  activeTrack: Object,
  isOpenPlaylist: boolean,
  togglePlayTrack: (isPlaying: boolean)=>void,
  togglePlay: ()=>void,
  origin: Object,
  togglePlaylist: ()=>void,
  activeIterateTrack: ()=>void

};

class Player extends Component {
  props: PropsType;
  togglePlay: ()=>void;

  constructor(props: PropsType) {
    super(props)
    this.togglePlay = this.togglePlay.bind(this)
  }

  componentDidUpdate() {
    const audioElement = ReactDOM.findDOMNode(this.refs.audio)
    if (!audioElement) return
    const { isPlaying } = this.props;
    isPlaying ? audioElement.play() : audioElement.pause()
  }

  togglePlay() {
    const { togglePlayTrack, isPlaying } = this.props
    togglePlayTrack(!isPlaying)
  }

  renderNav() {
    const {
      isPlaying, activeTrack, isOpenPlaylist,
      activeIterateTrack, togglePlaylist
    } = this.props
    if (!activeTrack) return
    const { origin } = activeTrack
    const { stream_url } = origin
    return (
      <div className="player-content">
        <div>
          <i
            className="fa fa-step-backward"
            onClick={() => activeIterateTrack(activeTrack, -1)}
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
            onClick={() => activeIterateTrack(activeTrack, 1)}
          >&nbsp;</i>
        </div>
        <div>
          <i
            className="fa fa-list"
            onClick={() => togglePlaylist(!isOpenPlaylist)}
          >&nbsp;</i>
        </div>
        <audio
          ref="audio" id="audio"
          src={addAccessToken(stream_url, '?')}
        >
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

function mapStateToProps(state: Object) {
  const { player, environment } = state
  return {
    isPlaying: player.get('isPlaying'),
    activeTrack: player.get('activeTrack'),
    isOpenPlaylist: environment.get('isOpenPlaylist')
  }
}

export default connect(mapStateToProps, actions)(Player)
