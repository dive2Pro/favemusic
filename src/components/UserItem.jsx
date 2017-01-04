// @flow
import React from 'react'

const UserItem = (props: { user: UserType, idx: number }) => {
  const {
    permalink_url, avatar_url, username,
    followers_count, followings_count, track_count
  } = props.user
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
        </div>
      </div>
    </div>
  )
}

export default UserItem
