// @flow
import React from 'react'
import { map } from 'lodash'

type ConfiguType = {
  fn: () => void,
  className: string
};

const Action = ({ cfg }: {}) => {
  const { fn, className } = cfg
  return (
    <div className="actions-item">
      <i onClick={() => fn()} className={className}>
      </i>
    </div>
  )
}
const Actions = (props: {
  configuration: Array<ConfiguType>,
  isVisible: boolean
}) => {
  const { configuration, isVisible } = props

  return (
    <div className={`action ${isVisible ? "action-visible" : ""}`}>
      {map(configuration, (cfg: ConfiguType, idx: number) => (
        <Action cfg={cfg} key={idx} />
      )
      )}
    </div>
  )
}

export default Actions
