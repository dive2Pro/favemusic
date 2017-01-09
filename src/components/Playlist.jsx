// @flow
import React from 'react'
import MiniTrackContainer from './MiniTrack'
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreator.js'
import { PLAYLISTTYPE } from '../constants/toggleTypes'
import { bindActionCreators } from 'redux'
type PropsType = {
  activeTrack: Object,
  isPlaying: boolean,
  playlist: Array<TrackType>,
  isOpenPlaylist: boolean
};
const couldShowPlaylist = (toggle: {}) => {
  if (toggle[PLAYLISTTYPE]) {
    return 'playlist-visible'
  }
  return ''
}

const renderMenu = (clearPlayListF: Function) => {
  return (
    <div className="playlist-menu">
      <div>Player Queue</div>
      <div>
        <button onClick={() => clearPlayListF()} className="inline">Clear Queue</button>
      </div>
    </div>
  )
}
const renderPlaylist = (playlist: []) => {
  return (
    <ul className="playlist-content">
      {playlist.map((id: number, idx: number) => {
        return (
          <li key={idx}>
            <MiniTrackContainer id={id} />
          </li>
        )
      })}</ul>
  )
}

const Playlist = ({ ...props }: PropsType) => {
  const { clearPlayListF, toggle, playlist } = props
  return (
    <div className={`playlist ${couldShowPlaylist(toggle)}`}>
      {renderMenu(clearPlayListF)}
      {renderPlaylist(playlist)}
    </div>
  )
}

function mapStateToProps(state: Object) {
  const { player, toggle } = state
  return {
    playlist: player.playlist
    , activeTrackId: player.activeTrackId
    , toggle
  }
}
function mapDisaptchToProps(dispatch: Function) {
  return {
    clearPlayListF: bindActionCreators(actions.clearPlayListF, dispatch)
  }
}

export default connect(mapStateToProps, mapDisaptchToProps)(Playlist)
