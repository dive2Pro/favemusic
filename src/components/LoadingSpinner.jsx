import React, { Component } from 'react';

class LoadingSpinner extends Component {
  render() {
    return (
      <div className="loading-spinner">
        <i className="fa fa-spinner fa-spin" />
      </div>);
  }
}

export default LoadingSpinner;
