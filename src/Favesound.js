import React, { Component } from 'react'
import store, { reduxHistory } from './store'
import { Router, Route, IndexRoute, applyRouterMiddleware } from 'react-router'
import { Provider } from 'react-redux'
import DashboardContainer from './containers/DashboardContainer'
import App from './containers/App'
import Callback from './containers/Callback'
import BrowserContainer from './containers/BrowserContainer'
import ReactDOM from 'react-dom'
import useScrollMiddleware from 'react-router-scroll/lib/useScroll'

require('../styles/index.scss')
require('font-awesome/css/font-awesome.css')
function userScrollCallback(preRouterProps, { location }) {
  console.info(preRouterProps, '----', location)
  return true
}
/**
 * todo why when the route change scroll to the top?
 */
const userScroll = applyRouterMiddleware(useScrollMiddleware(userScrollCallback))

const routes = (
  <Route component={App}>
    <IndexRoute component={App} />
    <Route path="/dashboard" component={DashboardContainer} />
    <Route path="/callback" component={Callback} />
    <Route path="/browse" component={BrowserContainer} />
    <Route path="/" component={DashboardContainer} />
  </Route>
)

class Favesound extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <Router history={reduxHistory} render={userScroll}>
          {routes}
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(
  <Favesound />,
  document.getElementById('root')
)
