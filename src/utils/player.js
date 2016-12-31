/**
 * Created by hyc on 17-1-1.
 */

export function isActivePlayingTrack (activeTrack, track, isPlaying) {
  return isPlaying && activeTrack && activeTrack.origin.id === track.origin.id
}