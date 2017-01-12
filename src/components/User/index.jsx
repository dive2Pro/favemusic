// @flow
import React from 'react'
import Actions from '../HoverActions/index'
import Artwork from '../Artwork/index'
import { connect } from 'react-redux'
import * as actions from '../../actions/actionCreator'
import { isSameById } from '../../services/player'
import InfoList from '../InfoList/index'
import { bindActionCreators } from 'redux'
import Permalink from '../Permalink/index'

const UserItem = ({ ...props }: { }) => {
  const { user, followingsIds } = props
  const {
    permalink_url, avatar_url, username,
    followers_count, followings_count, track_count
    , id
  } = user
  const isFollowing = followingsIds.some(isSameById(id))

  const configuration = [{
    fn: () => props.toggleFollowingF(id)
    , className: isFollowing ? "fa fa-group is-active" : "fa fa-group"
  }]
  const infoConfigurations = [
    { className: "fa fa-user-plus", count: followers_count }
    , { className: "fa fa-group", count: followings_count }
    , { className: "fa fa-music", count: track_count }
  ]
  return (
    <div className="item">
      <div>
        <Artwork size={40} image={avatar_url} alt={username} />
      </div>
      <div className="item-content">
        <Permalink href={permalink_url} text={username} />
        <div className="item-content-info">
          <InfoList infoConfigurations={infoConfigurations} />
          <Actions isVisible={isFollowing} configuration={configuration} />
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state: baseStateType, ownState: {}) => {
  return {
    user: ownState.user
    , followingsIds: state.user.followingsIds
  }
}
function mapDispatchToProps(dispatch: Function) {
  return {
    toggleFollowingF: bindActionCreators(actions.toggleFollowingF, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItem)
