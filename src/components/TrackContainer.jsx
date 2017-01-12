/* eslint-disable max-len */
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'
import { bindActionCreators } from 'redux'
import StreamTrack from './StreamTrack'
import PreviewTrack from './PreviewTrack'
/* eslint-enable max-len */


function mapStateToProps(state, ownState) {
  return {
    ids: ownState.ids
    , id: ownState.id
    , tracks: state.entities.tracks
    , users: state.entities.users
    , songs: state.entities.songs
    , isPlaying: state.player.isPlaying
  }
}


function mapDispatchToProps(dispatch: Function) {
  return {
    activateTrackF: bindActionCreators(actions.activateTrackF, dispatch)
    , addTrackToPlaylistF: bindActionCreators(actions.addTrackToPlaylistF, dispatch)
  }
}
const StreamTrackContainer = connect(mapStateToProps, mapDispatchToProps)(StreamTrack)
const PreviewTrackContainer = connect(mapStateToProps, mapDispatchToProps)(PreviewTrack)

export { StreamTrackContainer, PreviewTrackContainer }
