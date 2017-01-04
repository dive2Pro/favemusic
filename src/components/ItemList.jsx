// @flow
import React, { Component } from 'react'
import LoadingSpinner from './LoadingSpinner'
import TrackItem from './TrackItem'
import UserItem from './UserItem'

type MosaicpropsType = {
  isMoreToggled: ?boolean,
  requestInProcess: ?boolean
};

class UserMosaic extends Component {
  props: MosaicpropsType;
  state: { isMoreToggled: boolean };
  toggleMore: ()=>void;

  constructor(props: MosaicpropsType) {
    super(props);
    this.state = {
      isMoreToggled: props.isMoreToggled
    }
    this.toggleMore = this.toggleMore.bind(this)
  }

  toggleMore() {
    const changeToggled = !this.state.isMoreToggled
    this.setState({
      isMoreToggled: changeToggled
    })
  }

  renderUser(user: UserType, idx: number) {
    return (
      <li key={idx}>
        <UserItem user={user} idx={idx} />
      </li>
    )
  }

  renderTrack(track: TrackType, idx: number) {
    if (!track) return ''
    return (
      <li key={idx}>
        <TrackItem idx={idx} track={track} />
      </li>
    )
  }

  renderMosaic() {
    const { collections, kind, requestInProcess } = this.props
    if (!collections || requestInProcess) {
      return (
        <div><LoadingSpinner isLoading={requestInProcess} /></div>
      )
    }
    const list = Array.isArray(collections) ? collections : collections.toJSON()
    if (kind === "user") {
      return (<div className="user-mosaic-content">
        <ul>{list.map(this.renderUser)}</ul>
      </div>)
    }

    if (kind === "track") {
      return (<div className="user-mosaic-content">
        <ul>{list.map(this.renderTrack)}</ul>
      </div>)
    }
  }

  renderNextButton() {
    const { followersNextHref, fetchFollowers, user } = this.props
    if (!followersNextHref || this.isMoreToggled) {
      return (
        <div>
          <button
            className="ghost"
            onClick={() => fetchFollowers(user, followersNextHref)}
          >LoadMore
          </button>
        </div>
      )
    } else {
      return ""
    }
  }

  renderChevron() {
    const { isMoreToggled } = this.state
    const { collections } = this.props
    if (collections.length > 4) {
      return (<i className={`fa ${isMoreToggled ? 'fa-chevron-up' : 'fa-chevron-down'}`} />)
    } else {
      return (<div></div>)
    }
  }

  render() {
    return (
      <div className="user-mosaic">
        <h2><a href="#" onClick={() => this.toggleMore()}>
          {this.props.title}&nbsp;
          {this.renderChevron()}
        </a>
        </h2>

        <div className={this.state.isMoreToggled ? 'more' : ''}>
          {
            this.renderMosaic()
          }
        </div>
        <div className="user-mosaic-action">
          {this.renderNextButton()}
        </div>
      </div>
    )
  }
}

UserMosaic.defaultProps = {
  isMoreToggled: false
}

export default UserMosaic
