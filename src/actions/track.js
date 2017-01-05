// @flow
/**
 * Created by hyc on 17-1-5.
 */
import * as actionTypes from '../constants/actionTypes'
import apiUrl from '../utils/soundcloundApi'
function addToFavorites(track: TrackType) {
  return {
    type: actionTypes.ADD_TO_FAVORITES,
    track
  }
}
function removeFromFavorites(track: TrackType) {
  return {
    type: actionTypes.REMOVE_FROM_FAVORITES,
    track
  }
}

export function likeF(track: TrackType) {
  return (dispatch: Function) => {
    const { origin } = track
    const { user_favorite } = origin
    const url = apiUrl(`me/favorites/${track.origin.id}`, "?")
    const fetchCall = fetch(url, { method: user_favorite ? "delete" : "put" })
    fetchCall.then((response: Object) => response.json())
      .then(
        () => {
          const newOrigin = Object.assign({}, track.origin, { user_favorite: !user_favorite })
          const newTrack = Object.assign({}, track, { origin: newOrigin })
          if (newOrigin.user_favorite) {
            dispatch(addToFavorites(newTrack))
          } else {
            dispatch(removeFromFavorites(newTrack))
          }
        }
      ).catch(
      (err: Object) => {
        console.info(err)
      }
    )
  }
}
