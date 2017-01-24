import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { sortByTypeF } from '../../actions/actionCreator'
import * as sortTypes from '../../constants/sortTypes'
import map from '../../services/map'
import { ButtonInline } from '../ButtonInline/index'
import ButtonActive from '../ButtonActive/index'
import classnames from 'classnames'

const hasActiveSortType = (type) => {
  return type !== sortTypes.NONE
}

const SortContainer = ({sortedType, toggleSortType}) => {
  const BAs = map((type, idx) => (
    <ButtonActive
      key={idx}
      onClick={() => toggleSortType(type)}
      isActive={type === sortedType}
    >
      {type}
    </ButtonActive>
  ), sortTypes)
  const sortedTypeIconClass = classnames(
    "stream-interaction-icon"
    , {
      "stream-interaction-icon-active": hasActiveSortType(sortedType)
    }
  )
  return (
    <div className="stream-interaction">
      <div className={sortedTypeIconClass}>
        <ButtonInline
          onClick={() => toggleSortType(sortTypes.NONE)}
        >
          <i className="fa fa-sort" />
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
    sortedType: state.sort.sortType
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    toggleSortType: bindActionCreators(sortByTypeF, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SortContainer)
