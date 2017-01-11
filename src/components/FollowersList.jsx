// @flow
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import UserItemContainer from "./UserItem";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreator";
import { FOLLOWERSTYPE } from "../constants/toggleTypes";
import { FOLLOWERS } from "../constants/paginateLinkTypes";
type MosaicpropsType = { isMoreToggled: ?boolean, requestInProcess: ?boolean };

const renderUser = (entities: {}) => (id: number, idx: number) => {
  // const isFollowing = followingsIds ? followingsIds
  //   .some((followingId: number) => followingId === id) : false
  const user = entities[id];
  return (
    <li key={idx}>
      <UserItemContainer user={user} />
    </li>
  );
};

const renderMosaic = ({ ...props }: basePropsType) => {
  const { ids, requestInProcess, entities } = props;
  console.info("renderMosaic : ", ids);
  if (!ids || requestInProcess) {
    return <div><LoadingSpinner isLoading={requestInProcess} /></div>;
  }

  return (
    <div className="list-content">
      <ul>{ids.map(renderUser(entities))}</ul>
      <ul>{}</ul>
    </div>
  );
};

const renderNextButton = ({ ...props }: { }) => {
  const { nextHref, fetchMoreF, user, isExpanded } = props;
  if (!nextHref || isExpanded) {
    return (
      <div>
        <button
          className="ghost" onClick={
            () => fetchMoreF(user, nextHref)
          }>LoadMore
        </button>
      </div>
    );
  } else {
    return "";
  }
};

const renderChevron = ({ ids, isExpanded }: { }) => {
  if (ids.length > 4) {
    return (<i
      className={
        `fa ${isExpanded ? "fa-chevron-up" : "fa-chevron-down"}`
      } />);
  } else {
    return <div></div>;
  }
};

const FollowingsList = ({ ...props }: MosaicpropsType) => {
  const { title, toggleExpandF, isExpanded } = props;
  return (
    <div className="list">
      <h2>
        <a href="#" onClick={toggleExpandF}>
          {title}
          {renderChevron({ ...props })}
        </a>
      </h2>
      <div className={isExpanded ? "more" : ""}>
        {renderMosaic({ ...props })}
      </div>
      <div className="list-action">
        {renderNextButton({ ...props })}
      </div>
    </div>
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
