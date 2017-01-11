import React from 'react'

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
      {infoConfigurations.map((info, idx) => (<InfoItem key={idx} info={info} idx={idx} />))}
    </div>
  )
}

export default InfoList
