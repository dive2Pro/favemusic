import React from 'react'
import LoadingSpinner from '../LoadingSpinner/index'

const MoreButton = ({ isLoading, fetchComment, nextHref, isHidden }) => {
  if (isLoading || !nextHref || isHidden) {
    return (<noscript />)
  }
  return (
    <div>
      <button className="ghost" onClick={fetchComment}>Load More</button>
      <LoadingSpinner isLoading={isLoading} />
    </div>
  )
}
export default MoreButton

