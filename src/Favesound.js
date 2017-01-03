import React, { Component } from 'react';
import store, { reduxHistory } from './store'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import DashboardContainer from './containers/DashboardContainer'
import App from './containers/App'
import Callback from './containers/Callback'
import ReactDOM from 'react-dom';
require('../styles/index.scss')
require('font-awesome/css/font-awesome.css')

const routes = (
  <Route component={App}>
    <IndexRoute component={App} />
    <Route path="/dashboard" component={DashboardContainer} />
    <Route path="/callback" component={Callback} />
    <Route path="/" component={DashboardContainer} />
  </Route>
)

class Favesound extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <Provider store={store}>
        <Router history={reduxHistory}>
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
