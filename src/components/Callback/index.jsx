import React from 'react'
export default class Callback extends React.Component {
  componentDidMount() {
    window.setTimeout(opener.SC.connectCallback, 1)
  }

  render() {
    return (
      <div>This should be close soon</div>
    )
  }
}

