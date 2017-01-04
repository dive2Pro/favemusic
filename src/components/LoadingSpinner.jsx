// @flow
import React from 'react';

const LoadingSpinner = (props: { isLoading: boolean }) => {
  if (props.isLoading) {
    return (
      <div className="loading-spinner">
        <i className="fa fa-spinner fa-spin" />
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default LoadingSpinner;
