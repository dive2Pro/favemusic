import React, { Component } from 'react'
import FilterDuration from '../FilterDuration/index'
import SortContainer from '../Sort/index'

class StreamInteraction extends Component {
  render() {
    return (
      <div className="stream-interactions">
        <div className="stream-interactions-item">
          <FilterDuration />
        </div>
        <div className="stream-interactions-item">
          <SortContainer />
        </div>
      </div>
    )
  }
}

export { StreamInteraction }
