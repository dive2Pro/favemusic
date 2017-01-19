import React from 'react'
import classnames from 'classnames'
const ButtonGhost = ({onClick, isSmall, children}) => {
  const buttonClazz = classnames(
    "button-ghost",
    {
      'button-ghost-small': isSmall
    }
  )
  return (
    <button
      className={buttonClazz}
      type="button"
      onClick={onClick}
      >{children}</button>
  )
}

export { ButtonGhost }
