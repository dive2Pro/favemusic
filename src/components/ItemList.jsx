// @flow
import React, { Component } from 'react'
import LoadingSpinner from './LoadingSpinner'
type MosaicpropsType = {
  isMoreToggled: boolean,
  requestInProcess: boolean
};

class UserMosaic extends Component {
  constructor(props: MosaicpropsType) {
    super(props);
    this.state = {
      isMoreToggled: props.isMoreToggled
    }
  }

  toggleMore() {
    console.log(this.isMoreToggled)
    this.isMoreToggled = !this.isMoreToggled
    this.setState({
      isMoreToggled: this.isMoreToggled
    })
  }

  renderUser(user: UserType, idx: number): ReactElement {
    const { username, avatar_url, permalink_url } = user
    return (
      <li key={idx}>
        <a href={permalink_url}>
          <img
            src={avatar_url}
            alt={username} height="40" width="40"
          />
        </a>
      </li>
    )
  }

  renderTrack(track: TrackType, idx: number) {
    if (!track) return ''
    const { title, artwork_url, permalink_url } = track

    return (
      <li key={idx}>
        <a href={permalink_url}>
          <img
            src={artwork_url}
            alt={title} height="40" width="40"
          />
        </a>
      </li>
    )
  }

  renderMosaic() {
    const { collections, kind, requestInProcess } = this.props
    if (!collections || requestInProcess) {
      return (
        <div><LoadingSpinner /></div>
      )
    }
    const list = Array.isArray(collections) ? collections : collections.toJSON()
    if (kind === "user") {
      return (<div className="user-mosaic-content"><ul>{list.map(this.renderUser)}</ul></div>)
    }

    if (kind === "track") {
      return (<div className="user-mosaic-content"><ul>{list.map(this.renderTrack)}</ul></div>)
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


  render() {
    return (
      <div className="user-mosaic">
        <h2><a href="#" onClick={() => this.toggleMore()}>
          {this.props.title} <i className={`fa ${this.isMoreToggled ? 'fa-chevron-up' : 'fa-chevron-down'}`} />
        </a></h2>

        <div className={this.isMoreToggled ? 'more' : ''}>
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

UserMosaic.propsType = {
  isMoreToggled: React.PropTypes.bool
}
UserMosaic.defaultProps = {
  isMoreToggled: false
}

export default UserMosaic
