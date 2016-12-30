import React, { Component } from 'react'
import { connect } from 'react-redux'
import  * as actions from '../actions/actionCreator'
import { bindActionCreators } from 'redux'
class App extends Component {
  render () {
    const { session, auth }=this.props
    return (
      <div> I'm App
        {
          session
          || <button onClick={auth.bind(null)}>
            Login1
          </button>
        }
      </div>
    )
  }
}
function mapStateToProps (state) {
console.info(state)
  return {
    session: state.session
  }
}

function mapDispathToProps (dispatch) {
  let actionCreators = bindActionCreators(actions, dispatch)
  console.info(actionCreators)
  return actionCreators
}

const AppContainer = connect(mapStateToProps, mapDispathToProps)(App)
export default AppContainer
