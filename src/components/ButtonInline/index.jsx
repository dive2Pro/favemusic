import React from 'react'

const ButtonInline = ({ onClick, children }) => {
  return (
    <button onClick={onClick} type="button" className="button-inline">{children}</button>
  )
}
export {
  ButtonInline
}
