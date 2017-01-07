// @flow
import React, { Component } from 'react'
import LoadingSpinner from './LoadingSpinner'
import TrackItem from './TrackItem'
import UserItem from './UserItem'

type MosaicpropsType = {
  isMoreToggled: ?boolean,
  requestInProcess: ?boolean
};

class ItemList extends Component {
  props: MosaicpropsType;
  state: { isMoreToggled: boolean };
  toggleMore: () => void;

  state = {
    isMoreToggled: this.props.isMoreToggled
  }

  toggleMore = () => {
    const changeToggled = !this.state.isMoreToggled
    this.setState({
      isMoreToggled: changeToggled
    })
  }

  renderUser(id: number, idx: number) {
    const { toggleFollowingF, entities, followingsIds } = this.props
    const isFollowing = followingsIds ? followingsIds
      .some((followingId: number) => followingId === id) : false
    return (
      <li key={idx}>
        <UserItem
          user={entities[id]} idx={idx}
          isFollowing={isFollowing} toggleFollowingF={toggleFollowingF} />
      </li>
    )
  }

  renderTrack(id: number, idx: number) {
    const { entities } = this.props
    return (
      <li key={idx}>
        <TrackItem idx={idx} track={entities[id]} {...this.props} />
      </li>
    )
  }

  renderMosaic() {
    const { ids, kind, requestInProcess } = this.props
    if (!ids || requestInProcess) {
      return (
        <div><LoadingSpinner isLoading={requestInProcess} /></div>
      )
    }
    if (kind === "user") {
      return (<div className="user-mosaic-content">
        <ul>{ids.map(this.renderUser.bind(this))}</ul>
      </div>)
    }

    if (kind === "track") {
      console.info('ids  = ', ids.map);
      return (<div className="user-mosaic-content">
        <ul>{ids.map(this.renderTrack.bind(this))}</ul>
      </div>)
    }
  }

  renderNextButton() {
    const { nextHref, fetchMoreF, user } = this.props
    if (!nextHref || this.isMoreToggled) {
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

  renderChevron() {
    const { isMoreToggled } = this.state
    const { ids } = this.props
    if (ids.length > 4) {
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

ItemList.defaultProps = {
  isMoreToggled: false
}

export default ItemList
