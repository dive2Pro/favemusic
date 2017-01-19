import React from 'react'
import LoadingSpinner from '../LoadingSpinner/index'
import ButtonGhost from '../ButtonGhost/index'
const ButtonMore = ({ isLoading, fetchComment, nextHref, isHidden }) => {
  if (isLoading || !nextHref || isHidden) {
    return (<noscript />)
  }
  return (
    <div>
      <ButtonGhost onClick={fetchComment}>Load More</ButtonGhost>
      <LoadingSpinner isLoading={isLoading} />
    </div>
  )
}
export default ButtonMore

