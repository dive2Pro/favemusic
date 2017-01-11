// @flow
import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'
import { FAVORITESTYPE } from '../constants/toggleTypes'
import { FAVORITES } from '../constants/paginateLinkTypes'
import TrackItemContainer from './TrackItem'
type MosaicpropsType = {
  isMoreToggled: ?boolean,
  requestInProcess: ?boolean
};

const renderTrack = (eneities: {}) => (id: number, idx: number) => {
  const track = eneities[id]
  return (
    <li key={idx}>
      <TrackItemContainer idx={idx} track={track} />
    </li>
  )
}
const renderMosaic = ({ ...props }: basePropsType) => {
  const { ids, requestInProcess, entities } = props
  if (!ids || requestInProcess) {
    return (
      <div><LoadingSpinner isLoading={requestInProcess} /></div>
    )
  }
  return (<div className="list-content">
    <ul>{ids.map(renderTrack(entities))}</ul>
  </div>)
}

const renderNextButton = ({ ...props }: { }) => {
  const { nextHref, fetchMoreF, user, isExpanded } = props
  if (!nextHref || isExpanded) {
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

const renderChevron = ({ ids, isExpanded }: { }) => {
  if (ids.length > 4) {
    return (<i className={`fa ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`} />)
  } else {
    return (<div></div>)
  }
}

const FollowingsList = ({ ...props }: MosaicpropsType) => {
  const { title, toggleExpandF, isExpanded } = props
  return (
    <div className="list">
      <h2>
        <a href="#" onClick={toggleExpandF}>
          {title}&nbsp;
          {renderChevron({ ...props })}
        </a>
      </h2>
      <div className={isExpanded ? 'more' : ''}>
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

FollowingsList.defaultProps = {
  isMoreToggled: false
}
const mapStateToProps = (state: {}) => {
  const { user, entities, toggle, paginate, auth, request } = state
  return {
    toggle
    , ids: user.favoritesIds
    , title: "Favorites"
    , isExpanded: toggle[FAVORITESTYPE]
    , nextHref: paginate[FAVORITES]
    , user: auth.user
    , requestInProcess: request[FAVORITES]
    , entities: entities.tracks
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  const E$ = Object.create(null)
  return {
    toggleExpandF: bindActionCreators(actions.setToggledF.bind(E$, FAVORITESTYPE), dispatch)
    , fetchMoreF: bindActionCreators(actions.fetchFavoritesF, dispatch)
    , setToggledF: bindActionCreators(actions.setToggledF.bind(E$, FAVORITESTYPE), dispatch)
    ,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowingsList)
