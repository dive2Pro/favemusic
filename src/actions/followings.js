// @flow
import apiUrl from '../utils/soundcloundApi'
import { mergeFollowings } from './user'
import { REMOVE_FROM_FOLLOWINGS } from '../constants/actionTypes'

function removeFromFollowings(userId: number) {
  return {
    type: REMOVE_FROM_FOLLOWINGS
    , userId
  }
}

export function toggleFollowingF(userId: number) {
  return (dispatch: Function, getState: Function) => {
    const isFollowing = getState().user.followingsIds
      .some((followingId: number) => followingId === userId)
    const url = apiUrl(`me/followings/${userId}`, "?")
    fetch(url, { method: isFollowing ? "delete" : "put" })
      .then((response: Object) => response.json())
      .then(() => {
        if (isFollowing) {
          dispatch(removeFromFollowings(userId))
        } else {
          dispatch(mergeFollowings([userId]))
        }
      })
  }
}
