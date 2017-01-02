/**
 * Created by hyc on 17-1-1.
 */

export function isSameTrackAndPlaying(activeTrack, track, isPlaying) {
  return isPlaying && activeTrack && activeTrack.origin.id === track.origin.id
}

export function isSameTrack(track) {
  return function f(obj) {
    return obj.origin.id === track.origin.id
  }
}
