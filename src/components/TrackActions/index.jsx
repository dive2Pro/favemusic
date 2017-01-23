import React from 'react'
import { connect } from 'react-redux'
import { ButtonGhost } from '../ButtonGhost/index'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/actionCreator'
import { COMMENTSTYPE } from '../../constants/toggleTypes'
const TrackActions = ({onOpenComments, onAddTrackToPlaylist}) => {
  const isSmall = true
  return (
    <div className="track-meta-actions">
      <div className="track-meta-actions-item">
        <ButtonGhost
          isSmall={isSmall}
          onClick={onOpenComments}
          >
          <i className={`fa fa-comment`}>
          </i>
          Comments
        </ButtonGhost>
      </div>

      <div className="track-meta-actions-item">
        <ButtonGhost
          isSmall={isSmall}
          onClick={onAddTrackToPlaylist}
          >
          <i className="fa fa-list">
          </i>
          Add to Playlist
        </ButtonGhost>
      </div>
    </div>
  )
}
const mapStateToProps = () => {
  return {};
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps
  return {
    onOpenComments:
      bindActionCreators(() => actions.setDeepToggledF(COMMENTSTYPE, id), dispatch)
    , onAddTrackToPlaylist:
      bindActionCreators(() => actions.addTrackToPlaylistF(id), dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TrackActions)
