/**
 * Created by hyc on 16-12-31.
 */
export function getTrackIcon (type) {
  if (type === 'track-repost') {
    return 'fa fa-retweet';
  }

  if (type === 'playlist') {
    return 'fa fa-list';
  }

  if (type === 'track') {
    return 'fa fa-play';
  }
}