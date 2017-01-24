import React from 'react'
import {StreamInteraction} from '../StreamInteractions/index'
import Activities from '../Activities/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getAndCombined} from '../../services/filter'
import {DURATION_FILTER_FUNCTIONS} from '../../constants/durationFilter'
import {ACTIVITIES} from '../../constants/paginateLinkTypes'
import * as requestTypes from '../../constants/requestTypes'
import * as actions from '../../actions/actionCreator'
import { SORTFUNCTIONS } from '../../constants/sort'
const StreamActivities = ({
  fetchActivities
  , requestInProcess
  , activitiesIds
  , activeTrackId
  , activeFilter
  , trackEntities
  , sortFunc
  , nextHref}) => {
  return (
    <div>
      <StreamInteraction />
      <Activities
        activitiesIds={activitiesIds}
        activeTrackId={activeTrackId}
        requestInProcess={requestInProcess}
        scrollFunc={() => fetchActivities(nextHref)}
        activeFilter={activeFilter}
        trackEntities={trackEntities}
        sortFunc={sortFunc}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  const {user, player, request, paginate, filter, entities, sort } = state
  const filters = [DURATION_FILTER_FUNCTIONS[filter.durationType]]
  console.info(SORTFUNCTIONS[sort.sortType])
  return {
    activitiesIds: user.activitiesIds
    , activeTrackId: player.activeTrackId
    , requestInProcess: request[requestTypes.ACTIVITIES]
    , nextHref: paginate[ACTIVITIES]
    , trackEntities: entities.tracks
    , activeFilter: getAndCombined(filters)
    , sortFunc: SORTFUNCTIONS[sort.sortType]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchActivities: bindActionCreators(actions.fetchActivities, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamActivities)
