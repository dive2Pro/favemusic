import React from 'react'
import LoadingSpinner from '../LoadingSpinner/index'
import { ButtonGhost } from '../ButtonGhost/index'

const ButtonMore = ({ isLoading, fetchComment, isHidden }) => {
  if (isLoading || isHidden) {
    return (<noscript />)
  }
  return (
    <div className="button-more">
      <ButtonGhost onClick={fetchComment}>Load More</ButtonGhost>
      <LoadingSpinner isLoading={isLoading} />
    </div>
  )
}
export { ButtonMore }

