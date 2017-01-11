// @flow
import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import TrackItemContainer from './TrackItem'
import UserItemContainer from './UserItem'

export const renderUser = (entities: { }) => (id: number, idx: number) => {
  // const isFollowing = followingsIds ? followingsIds
  //   .some((followingId: number) => followingId === id) : false
  const user = entities[id]
  return (
    <li key={idx}>
      <UserItemContainer
        user={user}
        />
    </li>
  )
}

export const renderTrack = (eneities: {}) => (id: number, idx: number) => {
  const track = eneities[id]
  return (
    <li key={idx}>
      <TrackItemContainer idx={idx} track={track} />
    </li>
  )
}

export const renderMosaic = ({ ...props }: basePropsType) => {
  const { ids, kind, requestInProcess, entities } = props
  console.info('renderMosaic : ', ids);
  if (!ids || requestInProcess) {
    return (
      <div><LoadingSpinner isLoading={requestInProcess} /></div>
    )
  }
  if (kind === "user") {
    return (<div className="list-content">
      <ul>{ids.map(renderUser(entities))}</ul>
    </div>)
  }

  if (kind === "track") {
    console.info('ids  = ', ids.map);
    return (<div className="list-content">
      <ul>{ids.map(renderTrack(entities))}</ul>
    </div>)
  }
}

export const renderNextButton = ({ ...props }: {}) => {
  const { nextHref, fetchMoreF, user, isExpand } = props
  if (!nextHref || isExpand) {
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

export const renderChevron = ({ ids, isExpanded }: {}) => {
  if (ids.length > 4) {
    return (<i className={`fa ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`} />)
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
          {renderChevron({ ...props })}
        </a>
      </h2>
      <div className={isExpanded ? 'more-visible' : ''}>
        {
          renderMosaic({ ...props })
        }
      </div>
      <div className="list-action">
        {renderNextButton({ ...props })}
      </div>
    </div>
  )
}

List.defaultProps = {
  isMoreToggled: false
}

export default List
