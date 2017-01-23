import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCommentByIdF } from '../../actions/actionCreator'
import { COMMENTS } from '../../constants/paginateLinkTypes'
import { COMMENTSTYPE } from '../../constants/toggleTypes'
import map from '../../services/map'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
import Artwork from '../Artwork/index'
import { fromNow } from '../../services/track'
import { ButtonMore } from '../ButtonMore/index'


const Item = ({ comment, user }) => (
  <div className="comments-item">
    <Artwork
      alt={comment.kind}
      image={user.avatar_url}
      size={30} />
    <div className="comments-item-body">
      {comment.body}
    </div>
    <div className="comments-item-meta">
      {fromNow(comment.created_at)}
    </div>
  </div>
)
class Comments extends Component {
  render() {
    const { commentsIds, trackId, commentUsers
      , commentEntities, isReqInprocess, isVisible, fetchComment, nextHref } = this.props
    const visiClass = classnames(
      'comments'
      , {
        active: isVisible
      }
    )
    return (
      <div className={visiClass}>
        {map(
          (id, idx) => {
            const comment = commentEntities[id]
            return (<Item
              key={idx}
              user={commentUsers[comment.user]}
              comment={comment} />)
          }, commentsIds)}
        <ButtonMore
          nextHref={nextHref}
          fetchComment={() => fetchComment(trackId, nextHref)}
          isLoading={isReqInprocess || !commentsIds} />
      </div>
    )
  }
}
const mapStateToProps = (state, ownState) => {
  const trackId = ownState.trackId
  const nextHref = state.paginate[COMMENTS] && state.paginate[COMMENTS][trackId]
  const isReqInprocess = state.request[COMMENTS] && state.request[COMMENTS][trackId]
  const isVisible = state.toggle[COMMENTSTYPE] && state.toggle[COMMENTSTYPE][trackId]
  const commentEntities = state.entities && state.entities.comments
  const commentUsers = state.entities && state.entities.users
  return {
    trackId
    , commentsIds: state.comment[trackId] && state.comment[trackId].commentsIds
    , nextHref
    , isReqInprocess
    , isVisible
    , commentEntities
    , commentUsers
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchComment: bindActionCreators(fetchCommentByIdF, dispatch)
  }
}
export { Comments }
export default connect(mapStateToProps, mapDispatchToProps)(Comments)
