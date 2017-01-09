/**
 * Created by hyc on 17-1-1.
 */

export function isSameTrackAndPlaying(activeTrackId, trackId, isPlaying) {
  return isPlaying && activeTrackId && activeTrackId === trackId
}

export function isSameById(trackId) {
  return function f(id) {
    return id === trackId
  }
}
