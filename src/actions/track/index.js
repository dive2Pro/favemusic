// @flow
/**
 * Created by hyc on 17-1-5.
 */
import * as actionTypes from '../../constants/actionTypes'
import apiUrl from '../../services/soundcloundApi'
import { syncEntities } from '../entities/index'
export const addToFavorites = (trackId: number) => ({
  type: actionTypes.ADD_TO_FAVORITES
  , trackId
})

export const removeFromFavorites = (trackId: number) => ({
  type: actionTypes.REMOVE_FROM_FAVORITES
  , trackId
})

export const likeF = (track: TrackType) =>
  (dispatch: Function) => {
    const { user_favorite } = track
    const url = apiUrl(`me/favorites/${track.id}`, "?")
    const fetchCall = fetch(url, { method: user_favorite ? "delete" : "put" })
    fetchCall.then((response: Object) => response.json())
      .then(
      () => {
        const newTrack = Object.assign({}, track, { user_favorite: !user_favorite })
        if (newTrack.user_favorite) {
          dispatch(addToFavorites(newTrack.id))
        } else {
          dispatch(removeFromFavorites(newTrack.id))
        }
        dispatch(syncEntities(newTrack, 'tracks'))
      }
      ).catch(
      (err: Object) => {
        console.info(err)
      }
      )
  }
