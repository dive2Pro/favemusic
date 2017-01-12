import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingSpinner from '../LoadingSpinner'
import { fetchCommentByIdF } from '../../actions/actionCreator'
import { COMMENTS } from '../../constants/paginateLinkTypes'
import { COMMENTSTYPE } from '../../constants/toggleTypes'
import map from '../../services/map'
import classnames from 'classnames'
import { bindActionCreators } from 'redux'
const LoadMoreOrLoading = ({ isLoading }) => {
  return (
    <div>
      <LoadingSpinner isLoading={isLoading} />
    </div>
  )
}
const Item = ({ title }) => (
  <div>
    {title}
  </div>
)
class Comments extends Component {
  componentDidMount() {
    const { trackId, nextHref, fetchComment } = this.props
  }

  render() {
    const { comments, isReqInprocess, isVisible } = this.props
    const visiClass = classnames(
      'comments'
      , {
        "active": isVisible
      }
    )
    return (
      <div className={visiClass}>
        {map(
          (comment, idx) => {
            return (<Item
              key={idx}
              comment={comment} />)
          }
          , comments)}
        <LoadMoreOrLoading isLoading={isReqInprocess} />
      </div>
    )
  }
}
const mapStateToProps = (state, ownState) => {
  const trackId = ownState.trackId
  const nextHref = state.paginate[COMMENTS] && state.paginate[COMMENTS][trackId]
  const isReqInprocess = state.request[COMMENTS] && state.request[COMMENTS][trackId]
  const isVisible = state.toggle[COMMENTSTYPE] && state.toggle[COMMENTSTYPE][trackId]
  return {
    trackId
    , comments: state.comment[trackId]
    , nextHref
    , isReqInprocess
    , isVisible
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchComment: bindActionCreators(fetchCommentByIdF, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
