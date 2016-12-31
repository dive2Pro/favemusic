import React, { Component } from 'react';
import store, { reduxHistory } from './store'
import { Router, Route, IndexRoute }from 'react-router'
import { Provider } from 'react-redux'
import Dashboard from './components/Dashboard'
import App from './components/App'
import Callback from './components/Callback'

const routes = (
  <Route path="/" component={Dashboard}>
    <IndexRoute component={App}/>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/callback' component={Callback}/>
  </Route>
)
class Favesound extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={reduxHistory}>
          {routes}
        </Router>
      </Provider>
    );
  }
}

export default Favesound;
