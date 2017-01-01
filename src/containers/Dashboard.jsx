import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'

const Main = React.createClass({
  render: function () {
    return (
      <div>
        {this.props.children}
      </div>);
  }
})

function mapStateToProps (state) {

  return state
}

const MyMain = connect(mapStateToProps, actions)(Main)

export default MyMain







