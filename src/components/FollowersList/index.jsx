// @flow
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions/actionCreator";
import { FOLLOWERSTYPE } from "../../constants/toggleTypes";
import { FOLLOWERS } from "../../constants/paginateLinkTypes";
import List from '../List/index'


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
};

FollowingsList.defaultProps = { isMoreToggled: false };


const mapStateToProps = (state: {}) => {
  const { user, entities, toggle, paginate, auth, request } = state;
  return {
    toggle
    , ids: user.followersIds
    , title: "Followers"
    , isExpanded: toggle[FOLLOWERSTYPE]
    , nextHref: paginate[FOLLOWERS]
    , user: auth.user
    , requestInProcess: request[FOLLOWERS]
    , entities: entities.users
    , kind: 'user'
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  const E$ = Object.create(null);
  return {
    toggleExpandF: bindActionCreators(
      actions.setToggledF.bind(E$, FOLLOWERSTYPE),
      dispatch
    )
    , fetchMoreF: bindActionCreators(actions.fetchFollowersF, dispatch)
    , setToggledF: bindActionCreators(
      actions.setToggledF.bind(E$, FOLLOWERSTYPE),
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowingsList)
