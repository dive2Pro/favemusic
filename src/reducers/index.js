/**
 * Created by hyc on 16-12-31.
 */
import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import { routerReducer } from 'react-router-redux'
/**
 * 最后，时刻谨记永远不要在克隆 state 前修改它。
 */
export default combineReducers({
  auth,
  user,
  routing: routerReducer

})