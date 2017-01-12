import React, { Component } from 'react'
import store, { reduxHistory } from './store'
import { Router, Route, IndexRoute, applyRouterMiddleware } from 'react-router'
import { Provider } from 'react-redux'
import DashboardContainer from './components/Dashboard/index'
import App from './components/index'
import Callback from './components/Callback/index'
import BrowserContainer from './components/Browse/index'
import ReactDOM from 'react-dom'
import useScrollMiddleware from 'react-router-scroll/lib/useScroll'

require('../styles/index.scss')
require('font-awesome/css/font-awesome.css')
function userScrollCallback(preRouterProps, { location }) {
  console.log(preRouterProps, '----', location)
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
