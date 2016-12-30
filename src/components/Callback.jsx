import React from 'react'
export default React.createClass({
  componentDidMount(){
    window.setTimeout(opener.SC.connectCallback, 1)
  },
  render () {
    return (
      <div>This should be close soon</div>
    )
  }
})

