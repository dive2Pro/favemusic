// @flow
import {
  SYNC_ENTITEIS,
  MERGE_USER_ENTITIES,
  MERGE_TRACK_ENTITIES,
  MERGE_SONGS_ENTITIES,
  MERGE_COMMENTS_ENTITIES
} from '../../constants/actionTypes'
export const mergeUserEntities = (users: []) =>
  ({
    type: MERGE_USER_ENTITIES
    , users
  })

export const mergeTrackEntities = (tracks: []) => ({
  type: MERGE_TRACK_ENTITIES
  , tracks
})

export const mergeSongEntities = (songs: []) => ({
  type: MERGE_SONGS_ENTITIES
  , songs
})
export const mergeCommentEntities = (comments: []) => ({
  type: MERGE_COMMENTS_ENTITIES
  , comments
})

export const syncEntities = (activeTrack: {}, key: 'foo') => ({
  type: SYNC_ENTITEIS
  , activeTrack
  , key
})

