// @flow
import React from 'react'
import LoadingSpinner from '../LoadingSpinner/index'
import { PreviewTrackContainer } from '../Track/index'
import UserItemContainer from '../User/index'
import classnames from 'classnames'
import map from 'lodash/map'
const SpecificUserItem = ({ user, idx }: {}) => {
  // const isFollowing = followingsIds ? followingsIds
  //   .some((followingId: number) => followingId === id) : false
  return (
    <li key={idx}>
      <UserItemContainer
        user={user}
        />
    </li>
  )
}

const SpecificTrackItem = ({ track, idx}: {}) => {
  return (
    <li>
      <PreviewTrackContainer idx={idx} track={track} />
    </li>
  )
}

export const Mosaic = ({ ...props }: basePropsType) => {
  const { ids, kind, requestInProcess, entities } = props
  if (!ids || requestInProcess) {
    return (
      <div><LoadingSpinner isLoading={requestInProcess} /></div>
    )
  }
  if (kind === "user") {
    return (<div className="list-content">
      <ul>{map(ids, (id: number, idx: number) => {
        const user = entities[id]
        return (
          <SpecificUserItem key={idx} user={user} idx={idx} />
        )
      })}</ul>
    </div>)
  } else if (kind === "track") {
    console.info('ids  = ', ids.map);
    return (<div className="list-content">
      <ul>{map(ids, (id: number, idx: number) => {
        const track = entities[id]
        return (
          <SpecificTrackItem key={idx} id={id} track={track} />
        )
      })}</ul>
    </div>)
  }
}

export const NextButton = ({ ...props }: {}) => {
  const { nextHref, fetchMoreF, user, isExpanded, requestInProcess } = props
  if (!nextHref || !isExpanded) {
    return (<span></span>)
  } else if (requestInProcess) {
    return (
      <LoadingSpinner isLoading={requestInProcess} />
    )
  }
  return (
    <div>
      <button
        className="ghost"
        onClick={() => fetchMoreF(user, nextHref)}
        >LoadMore
      </button>
    </div>
  )
}

export const Chevron = ({ ids, isExpanded }: {}) => {
  if (ids.length > 4) {
    const ChevronClassName = classnames(
      "fa", {
        "fa-chevron-up": isExpanded
      }
      , {
        "fa-chevron-down": !isExpanded
      }
    )
    return (<i className={ChevronClassName} />)
  } else {
    return (<div></div>)
  }
}

const List = ({ ...props }: basePropsType) => {
  const { title, isExpanded, toggleExpandF } = props
  return (
    <div className="list">
      <h2>
        <a href="#" onClick={toggleExpandF}>
          {title}&nbsp;
          <Chevron { ...props } />
        </a>
      </h2>
      <div className={isExpanded ? 'more-visible' : ''}>
        <Mosaic { ...props } />
      </div>
      <div className="list-action">
        <NextButton { ...props } />
      </div>
    </div>
  )
}

List.defaultProps = {
  isMoreToggled: false
}

export default List
