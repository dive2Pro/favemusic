/* @flow */
import React from 'react'
import { map } from 'lodash'
import classnames from "classnames"
type ConfiguType = {
  fn: () => void,
  className: string
};

export const Action = ({ cfg }: { cfg: ConfiguType }) => {
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
  const clazzName = classnames(
    'action'
    , {
      'action-visible': isVisible
    }
  )

  return (
    <div className={clazzName}>
      {map(configuration, (cfg: ConfiguType, idx: number) => (
        <Action cfg={cfg} key={idx} />
      )
      )}
    </div>
  )
}

export default Actions
