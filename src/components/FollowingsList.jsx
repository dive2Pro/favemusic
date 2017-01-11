// @flow
import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import UserItemContainer from './UserItem'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'
import { FOLLOWINGSTYPE } from '../constants/toggleTypes'
import { FOLLOWINGS } from '../constants/paginateLinkTypes'
type MosaicpropsType = {
  isMoreToggled: ?boolean,
  requestInProcess: ?boolean
};

const renderUser = (entities: {}) => (id: number, idx: number) => {
  // const isFollowing = followingsIds ? followingsIds
  //   .some((followingId: number) => followingId === id) : false
  const user = entities[id]
  return (
    <li key={idx}>
      <UserItemContainer
        user={user}
        />
    </li>
  )
}

const renderMosaic = ({ ...props }: basePropsType) => {
  const { followingsIds, requestInProcess, entities } = props
  console.info('renderMosaic : ', followingsIds);
  if (!followingsIds || requestInProcess) {
    return (
      <div><LoadingSpinner isLoading={requestInProcess} /></div>
    )
  }
  return (<div className="list-content">
    <ul>{followingsIds.map(renderUser(entities))}</ul>
  </div>)
}

const renderNextButton = ({ ...props }: { }) => {
  const { nextHref, fetchMoreF, user, isExpanded } = props
  if (!nextHref || isExpanded) {
    return (
      <div>
        <button
          className="ghost"
          onClick={() => fetchMoreF(user, nextHref)}
          >LoadMore
        </button>
      </div>
    )
  } else {
    return ""
  }
}

const renderChevron = ({ followingsIds, isExpanded }: { }) => {
  if (followingsIds.length > 4) {
    return (<i className={`fa ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`} />)
  } else {
    return (<div></div>)
  }
}

const FollowingsList = ({ ...props }: MosaicpropsType) => {
  const { title, toggleExpandF, isExpanded } = props
  return (
    <div className="lis">
      <h2>
        <a href="#" onClick={toggleExpandF}>
          {title}&nbsp;
          {renderChevron({ ...props })}
        </a>
      </h2>
      <div className={isExpanded ? 'more' : ''}>
        {
          renderMosaic({ ...props })
        }
      </div>
      <div className="lis-action">
        {renderNextButton({ ...props })}
      </div>
    </div>
  )
}

FollowingsList.defaultProps = {
  isMoreToggled: false
}
const mapStateToProps = (state: {}) => {
  const { user, entities, toggle, paginate, auth, request } = state
  return {
    toggle
    , followingsIds: user.followingsIds
    , title: "Followings"
    , isExpanded: toggle[FOLLOWINGSTYPE]
    , nextHref: paginate[FOLLOWINGS]
    , user: auth.user
    , requestInProcess: request[FOLLOWINGS]
    , entities: entities.users
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  const E$ = Object.create(null)
  return {
    toggleExpandF: bindActionCreators(actions.setToggledF.bind(E$, FOLLOWINGSTYPE), dispatch)
    , fetchMoreF: bindActionCreators(actions.fetchFollowingsF, dispatch)
    , setToggledF: bindActionCreators(actions.setToggledF.bind(E$, FOLLOWINGSTYPE), dispatch)
    ,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingsList)
