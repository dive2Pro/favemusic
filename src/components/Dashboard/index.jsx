// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions/actionCreator'
import {bindActionCreators} from 'redux'
import FollowingsList from '../FollowingsList/index'
import FollowersList from '../FollowersList/index'
import FavoritesList from '../FavoritesList/index'
import StreamActivities from '../StreamActivities/index'
class App extends Component {
  props: basePropsType;
  init: () => void

  componentDidMount() {
    const {init} = this.props
    init()
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-main">
          <StreamActivities />
        </div>
        <div className="dashboard-side">
          <FollowingsList />
          <FollowersList />
          <FavoritesList />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: Object) {
  return {
    ...state
  }
}

function mapDispathToProps(dispatch: Function) {
  return {
    init: bindActionCreators(actions.init, dispatch)
  }
}

const AppContainer = connect(mapStateToProps, mapDispathToProps)(App)
export default AppContainer
