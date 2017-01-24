/* eslint-disable max-len */
import { connect } from 'react-redux'
import * as actions from '../../actions/actionCreator'
import { bindActionCreators } from 'redux'
import StreamTrack from './stream'
import PreviewTrack from './preview'
import PlaylistTrack from './playlist'
/* eslint-enable max-len */

function mapStateToProps(state, ownState) {
  return {
    ids: ownState.ids
    , id: ownState.id
    , track: ownState.track
    , idx: ownState.idx
    , activity: ownState.activity
    , tracks: state.entities.tracks
    , users: state.entities.users
    , songs: state.entities.songs
    , isPlaying: state.player.isPlaying
    , activeTrackId: state.player.activeTrackId
    , typeReposts: state.user.typeReposts
    , typeTracks: state.user.typeTracks
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
    activateTrackF: bindActionCreators(actions.activateTrackF, dispatch)
    , addTrackToPlaylistF: bindActionCreators(actions.addTrackToPlaylistF, dispatch)
    , removeTrackFromPlaylistF: bindActionCreators(actions.removeTrackFromPlaylistF
      , dispatch)
    , deeptoggledF: bindActionCreators(actions.setDeepToggledF, dispatch)
  }
}
const StreamTrackContainer = connect(mapStateToProps, mapDispatchToProps)(StreamTrack)
const PreviewTrackContainer = connect(mapStateToProps, mapDispatchToProps)(PreviewTrack)
const PlaylistTrackContainer = connect(mapStateToProps, mapDispatchToProps)(PlaylistTrack)

export { StreamTrackContainer, PreviewTrackContainer, PlaylistTrackContainer }
