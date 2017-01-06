/**
 * Created by hyc on 17-1-1.
 */

export function isSameTrackAndPlaying(activeTrackId, trackId, isPlaying) {
  return isPlaying && activeTrackId && activeTrackId === trackId
}

export function isSameTrack(trackId) {
  return function f(obj) {
    return obj.origin.id === trackId
  }
}
