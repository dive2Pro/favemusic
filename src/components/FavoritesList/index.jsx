// @flow
import React from 'react'
import List from '../List/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/actionCreator'
import { FAVORITESTYPE } from '../../constants/toggleTypes'
import { FAVORITES } from '../../constants/paginateLinkTypes'

export const FavoritesContainer = ({ ...props }: MosaicpropsType) => {
  const { title, toggleExpandF, isExpanded, nextHref
    , user, requestInProcess, entities, ids, kind } = props;
  return (
    <List
      title={title}
      ids={ids}
      kind={kind}
      toggleExpandF={toggleExpandF}
      isExpanded={isExpanded}
      nextHref={nextHref}
      user={user}
      requestInProcess={requestInProcess}
      entities={entities}
      />
  );
}

FavoritesContainer.defaultProps = {
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
    , kind: 'track'

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

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer)
