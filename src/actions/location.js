/**
 * Created by hyc on 17-1-3.
 */
import { routerActions } from 'react-router-redux'
export const changeLocation = (path) =>
  dispatch => {
    dispatch(routerActions.push(path))
  }
