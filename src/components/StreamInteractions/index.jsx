import React, { Component } from 'react'
import FilterDuration from '../FilterDuration/index'

class StreamInteraction extends Component {
  render() {
    return (
      <div className="stream-interactions">
        <div className="stream-interactions-item">
          <FilterDuration />
        </div>
      </div>
    )
  }
}

export { StreamInteraction }
