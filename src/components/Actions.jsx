// @flow
import React from 'react'
type ConfiguType = {
  fn: ()=>void,
  className: string
};
const Actions = (props: { configuration: Array<ConfiguType>, isVisible: boolean }) => {
  const { configuration, isVisible } = props

  function renderActions(cfg: ConfiguType, idx: number) {
    const { fn, className } = cfg
    return (
      <div className="item-actions-item" key={idx}>
        <i onClick={() => fn()} className={className}>
        </i>
      </div>
    )
  }

  return (
    <div className={`item-actions ${isVisible ? "is-visible" : ""}`}>
      {configuration.map(renderActions)}
    </div>
  )
}

export default Actions
