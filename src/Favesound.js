import React, { Component } from 'react';
import store, { reduxHistory } from './store'
import { Router, Route, IndexRoute }from 'react-router'
import { Provider } from 'react-redux'
import Main from './components/Main'
import App from './components/App'
import Callback from './components/Callback'
import { CLIENT_ID, REDIRECT_URI }  from './constants/index'
import SC from 'soundcloud'

SC.initialize({ client_id: CLIENT_ID, redirect_uri: REDIRECT_URI })

const routes = (
  <Route path="/" component={Main}>
    <IndexRoute component={App}/>
    <Route path='/app' component={App}/>
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
