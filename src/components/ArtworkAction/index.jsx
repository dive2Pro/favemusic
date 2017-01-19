import React from 'react'
import classnames from 'classnames'

const ActionArtwork = ({ isVisible, action, className, children }) => {
  const overlayClass = classnames(
    "artwork-action-overlay"
    , {
      "artwork-action-overlay-visible": isVisible
    }
  )
  return (
    <div className="artwork-action">
      <div>{children}</div>
      <div className={overlayClass} onClick={action} >
        <i className={className}></i>
      </div>
    </div>
  )
}
ActionArtwork.propTypes = {
  action: React.PropTypes.func
  , isVisible: React.PropTypes.bool
  , className: React.PropTypes.string
  , children: React.PropTypes.object
}
export default ActionArtwork
