import React from 'react'
import map from '../../services/map'

export const InfoItem = ({ info, idx }) => (
  <div key={idx} className="info-list-item">
    <i className={info.className}>
      &nbsp;{info.count}
    </i>
  </div>
)

const InfoList = ({ infoConfigurations }) => {
  return (
    <div className="info-list">
      {map((info, idx) => (<InfoItem key={idx} info={info} idx={idx} />), infoConfigurations)}
    </div>
  )
}

export default InfoList
