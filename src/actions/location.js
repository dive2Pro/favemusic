/**
 * Created by hyc on 17-1-3.
 */
import { routerActions } from 'react-router-redux'
export function changeLocation(path) {
  return dispatch => {
    dispatch(routerActions.push(path))
  }
}
