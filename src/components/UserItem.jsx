// @flow
import React from 'react'
import Actions from './Actions'

const UserItem = (props: {
  isFollowing: boolean
  , user: UserType
  , idx: number
  , toggleFollowingF: Function
}) => {
  const {
    permalink_url, avatar_url, username,
    followers_count, followings_count, track_count
    , id
  } = props.user

  const configuration = [{
    fn: () => props.toggleFollowingF(id)
    , className: props.isFollowing ? "fa fa-group is-active" : "fa fa-group"
  }]
  return (
    <div className="item">
      <div>
        <img
          src={avatar_url}
          alt={username} height="40" width="40"
          />
      </div>
      <div className="item-content">
        <div className="item-content-name">
          <a href={permalink_url}>{username} </a>
        </div>
        <div className="item-content-info">
          <div className="item-content-info-item">
            <i className="fa fa-user-plus">&nbsp;{followers_count}</i>
          </div>

          <div className="item-content-info-item">
            <i className="fa fa-group">&nbsp;{followings_count}</i>
          </div>
          <div className="item-content-info-item">
            <i className="fa fa-music">&nbsp;{track_count}</i>
          </div>
          <Actions isVisible={props.isFollowing} configuration={configuration} />
        </div>
      </div>
    </div>
  )
}

export default UserItem
