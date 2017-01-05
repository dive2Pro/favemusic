/**
 * Created by hyc on 16-12-31.
 */
import { combineReducers } from 'redux'
import auth from './auth'
import user from './user'
import browse from './browse'
import request from './request'
import environment from './environment'
import { routerReducer } from 'react-router-redux'
import player from './player'
/**
 * 最后，时刻谨记永远不要在克隆 state 前修改它。
 */
export default combineReducers({
  auth
  , user
  , player
  , environment
  , request
  , browse
  , routing: routerReducer

})
