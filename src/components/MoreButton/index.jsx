import React from 'react'
import LoadingSpinner from '../LoadingSpinner/index'

const MoreButton = ({ isLoading, fetchComment }) => {
  if (isLoading) {
    return (
      <div>
        <LoadingSpinner isLoading={isLoading} />
      </div>
    )
  } else {
    return (
      <div>
        <button className="ghost" onClick={fetchComment}>Load More</button>
      </div>
    )
  }
}
export default MoreButton

