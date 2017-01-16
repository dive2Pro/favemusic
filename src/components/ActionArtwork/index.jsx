import React from 'react'
import classnames from 'classnames'

const ActionArtwork = ({ isVisible, action, className, children }) => {
  const overlayClass = classnames(
    "action-artwork-overlay"
    , {
      "action-artwork-overlay-visible": isVisible
    }
  )
  return (
    <div className="action-artwork">
      <div>{children}</div>
      <div className={overlayClass} onClick={action} >
        <i className={className}></i>
      </div>
    </div>
  )
}

export default ActionArtwork
