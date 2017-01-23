/**
 * Created by hyc on 16-12-31.
 */
import { combineReducers } from 'redux'
import auth from './auth/index'
import user from './user/index'
import browse from './browse/index'
import request from './request/index'
import paginate from './paginate/index'
import entities from './entities/index'
import comment from './comment/index'
import { routerReducer } from 'react-router-redux'
import player from './player/index'
import toggle from './toggle/index'
import filter from './filter/index'
/**
 * 最后，时刻谨记永远不要在克隆 state 前修改它。
 */
export default combineReducers({
  auth
  , user
  , player
  , request
  , browse
  , paginate
  , entities
  , toggle
  , comment
  , filter
  , routing: routerReducer
})
