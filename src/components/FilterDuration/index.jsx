import React from 'react'
import {bindActionCreators} from 'redux'
import * as actions from '../../actions/actionCreator'
import {connect} from 'react-redux'
import * as filterTypes from '../../constants/filterTypes'
import ButtonActive from '../ButtonActive/index'
import { DURATION_FILTER_NAMES } from '../../constants/durationFilter'
import map from '../../services/map'
import classnames from 'classnames'
import {ButtonInline} from '../ButtonInline/index'

const hasAciveFilter = (durationType) => {
  const {FILTER_DURATION_MIX, FILTER_DURATION_TRACK} = filterTypes
  return durationType === FILTER_DURATION_MIX || durationType === FILTER_DURATION_TRACK
}

const FilterDuration = ({toggleDurationType, durationType}) => {
  const BAs = map((type, idx) => (
    <ButtonActive
      key={idx}
      onClick={() => toggleDurationType(type)}
      isActive={durationType === type}
    >
      {DURATION_FILTER_NAMES[type]}
    </ButtonActive>
  ), filterTypes)
  const filterDurationIconClass = classnames(
    'stream-interaction-icon'
    , {
      'stream-interaction-icon-active': hasAciveFilter(durationType)
    }
  )
  return (
    <div className="stream-interaction">
      <div className={filterDurationIconClass}>
        <ButtonInline onClick={() => toggleDurationType(filterTypes.ALL)}>
          <i className="fa fa-filter" />
        </ButtonInline>
      </div>
      <div className="stream-interaction-content">
        {BAs}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    durationType: state.filter.durationType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDurationType: bindActionCreators(actions.filterByDuration, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDuration)
