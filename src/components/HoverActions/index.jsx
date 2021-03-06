/* @flow */
import React from 'react'
import map from '../../services/map'
import { ButtonInline } from '../ButtonInline/index'
import classnames from "classnames"
type ConfiguType = {
  fn: () => void,
  className: string
};

export const Action = ({ cfg }: {}) => {
  const { fn, className } = cfg
  return (
    <ButtonInline onClick={() => fn()}>
      <i className={className}>
      </i>
    </ButtonInline>
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
      {map((cfg: ConfiguType, idx: number) => (
        <Action cfg={cfg} key={idx} />
        ), configuration)}
    </div>
  )
}

export default Actions
