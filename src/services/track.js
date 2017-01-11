import moment from 'moment'

const ACTIVITY_TYPES = {
  trackRepost: 'track-repost'
  , playlistRepost: 'playlist-repost'
  , playlist: 'playlist'
  , track: 'track'
}

export function getTrackIcon(type) {
  if (type === ACTIVITY_TYPES.trackRepost) {
    return 'fa fa-retweet';
  }

  if (type === ACTIVITY_TYPES.playlist || ACTIVITY_TYPES.playlistRepost) {
    return 'fa fa-list';
  }

  if (type === ACTIVITY_TYPES.track) {
    return 'fa fa-play';
  }
}
export function isNotTrack(track) {
  const { origin, type } = track
  return !origin || !type || type === ACTIVITY_TYPES.playlist || type === ACTIVITY_TYPES.playlistRepost
}

export function normalizeSamples(samples) {
  let highestValue = 0
  for (const sample of samples) {
    if (sample > highestValue) {
      highestValue = sample
    }
  }
  const newSamples = []
  for (const sample of samples) {
    const newValue = sample / highestValue
    newSamples.push(newValue)
  }
  return newSamples
}

export function isJsonWaveform(waveform_url) {
  return waveform_url.indexOf('.json') !== -1
}

export function isPngWaveform(waveform_url) {
  return waveform_url.indexOf('.png') !== -1
}

export function wrapInOrigin(activity: ActivityType) {
  return {
    origin: activity
    , type: 'track'
    , id: activity.id
  }
}
export function addIdFromOrigin(activity: ActivityType) {
  return {
    ...activity
    , id: activity.origin.id
  }
}

export function durationFormat(ms) {
  const duration = moment.duration(ms)
  if (duration.asHours() > 1) {
    return Math.floor(duration.asHours()) + moment.utc(duration.asMilliseconds()).format(":mm:ss")
  } else {
    return moment.utc(duration.asMilliseconds()).format('mm:ss')
  }
}

export function fromNow(createAt) {
  return moment(new Date(createAt)).fromNow(true)
}

export function geneWaveFormElementId(id, idx) {
  return `waveform-${id}-${idx}`
}
