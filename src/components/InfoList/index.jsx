import React from 'react'
import map from '../../services/map'
import classnames from 'classnames'

export const InfoItem = ({ info, idx }) => {
  const infoItemClass = classnames(
    "info-list-item"
    , {
      "info-list-item-active": info.activeSort
    }
  )
  return (
    <div key={idx} className={infoItemClass}>
      <i className={info.className}>
        &nbsp;{info.count}
      </i>
    </div>
  )
}

const InfoList = ({ infoConfigurations }) => {
  return (
    <div className="info-list">
      {map((info, idx) => (<InfoItem key={idx} info={info} idx={idx} />)
        , infoConfigurations)}
    </div>
  )
}

export default InfoList
