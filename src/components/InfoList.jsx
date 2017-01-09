import React from 'react'

const renderInfoItem = (info, idx) => (
  <div key={idx} className="info-list-item">
    <i className={info.className}>
      &nbsp;{info.count}
    </i>
  </div>
)

const InfoList = ({ infoConfigurations }) => {
  return (
    <div className="info-list">
      {infoConfigurations.map(renderInfoItem)}
    </div>
  )
}

export default InfoList
