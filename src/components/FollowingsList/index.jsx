// @flow
import React from 'react'
import List from '../List/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/actionCreator'
import { FOLLOWINGSTYPE } from '../../constants/toggleTypes'
import { FOLLOWINGS } from '../../constants/paginateLinkTypes'

export const FollowingsList = ({ ...props }: MosaicpropsType) => {
  const { title, toggleExpandF, isExpanded, nextHref
    , user, requestInProcess, entities, ids, kind } = props;
  return (
    <List
      title={title}
      ids={ids}
      kind={kind}
      toggleExpandF={toggleExpandF}
      isExpanded={isExpanded}
      nextHref={nextHref}
      user={user}
      requestInProcess={requestInProcess}
      entities={entities}
      />
  );
}

FollowingsList.defaultProps = {
  isMoreToggled: false
}
const mapStateToProps = (state: {}) => {
  const { user, entities, toggle, paginate, auth, request } = state
  return {
    toggle
    , ids: user.followingsIds
    , title: "Followings"
    , isExpanded: toggle[FOLLOWINGSTYPE]
    , nextHref: paginate[FOLLOWINGS]
    , user: auth.user
    , requestInProcess: request[FOLLOWINGS]
    , entities: entities.users
    , kind: 'user'
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
