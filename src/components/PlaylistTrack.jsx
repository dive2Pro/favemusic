import React from "react";
import { isSameTrackAndPlaying, isSameById } from "../services/player";
import Actions from "./Actions";
import { connect } from "react-redux";
import * as actions from "../actions/actionCreator";
import { bindActionCreators } from "redux";
import Permalink from "./Permalink";

const renderImage = (artwork_url, title, avatar_url) => {
  return <img src={artwork_url || avatar_url} alt="title" height="40" width="40" />;
}

const renderActions = (
  { isPlaying, activateTrackF, activeTrackId, track, removeTrackFromPlaylistF }
) => {
  const { id } = track;
  const isVisibleAndPlay = isSameTrackAndPlaying(activeTrackId, id, isPlaying);
  const isVisible = isSameById(activeTrackId)(id);
  const configuration = [
    {
      fn: () => activateTrackF(id)
      , className: `fa ${isVisibleAndPlay ? "fa-pause" : "fa-play"}`
    }
    , { fn: () => removeTrackFromPlaylistF(id), className: "fa fa-times" }
  ];
  return <Actions isVisible={isVisible} configuration={configuration} />;
}

const PlaylistTrack = ({ ...props }) => {
  const { tracks, activeTrackId, users, id } = props;
  const track = tracks[id];
  const user = users[track.user];
  if (!track) {
    return;
  }
  const { artwork_url, title } = track;
  const { avatar_url, permalink_url, username } = user;
  const isSame = isSameById(activeTrackId)(track.id);
  const name = `${username} - ${title}`;
  return (
    <div className={`mini-track ${isSame ? "active-track" : ""}`}>
      <div className="mini-track-img">
        {renderImage(artwork_url, title, avatar_url)}
      </div>
      <div className="mini-track-content">
        <Permalink href={permalink_url} text={name} />
        {renderActions({ ...props, track })}
      </div>
    </div>
  );
};

function mapStateToProps(state: baseStateType, ownState: {}) {
  return {
    id: ownState.id
    , users: state.entities.users
    , tracks: state.entities.tracks
    , activeTrackId: state.player.activeTrackId
    , isPlaying: state.player.isPlaying
  };
}
function mapDispatchToProps(dispatch: Function) {
  return {
    activateTrackF: bindActionCreators(actions.activateTrackF, dispatch)
    , removeTrackFromPlaylistF: bindActionCreators(
      actions.removeTrackFromPlaylistF,
      dispatch
    )
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTrack)
