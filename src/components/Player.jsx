import React, { Component } from 'react'

class Player extends Component {
  constructor (props) {
    super(props)
  }

  renderNav () {
    return (
      <div className="player-content">
        <div>
          <i className="fa fa-step-backward">&nbsp;</i>
        </div>
        <div>
          <i className={`fa fa-play`}>&nbsp;</i>
        </div>
        <div>
          <i className="fa fa-step-forward">&nbsp;</i>
        </div>
        <audio src="#">
        </audio>
      </div>
    )
  }

  render () {
    return (
      <div className="player player-visible">
        {this.renderNav()}
      </div>

    )
  }
}

export default Player