import React from 'react'
import classnames from 'classnames'
import {ButtonInline} from '../ButtonInline/index'
const ButtonActive = ({onClick, isActive, children}) => {
  const clazz = classnames(
    "button-active"
    , {
      "button-active-selected": isActive
    }
  )

  return (
    <div
      className={clazz}
    >
      <ButtonInline
        onClick={onClick}>
        {children}
      </ButtonInline>
    </div>
  )
}

export default ButtonActive
