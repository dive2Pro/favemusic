import reduxRooter from '../reducers/index'
import { createStore, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

const logger = createLogger()
const routers = routerMiddleware(browserHistory)

const createStoreWithMiddleware =
  applyMiddleware(thunk, routers, logger)(createStore)

const store = createStoreWithMiddleware(reduxRooter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const reduxHistory = syncHistoryWithStore(browserHistory, store)

if (module.hot) {
  module.hot.accept('../reducers/', () => {
    const nextRootReducer = require('../reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}
export { store as default, reduxHistory }
