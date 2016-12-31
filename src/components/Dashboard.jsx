import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/actionCreator'

const Main = React.createClass({
  render: function () {
    return (
      <div>
        <h1>
          Hey man!
        </h1>

        {this.props.children}
      </div>);
  }
})

function mapStateToProps (state) {

  return state
}

const MyMain = connect(mapStateToProps, actions)(Main)

export default MyMain







