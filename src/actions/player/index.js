/**
 * Created by hyc on 17-1-1.
 */
import * as actionTypes from '../../constants/actionTypes'
import { isSameTrackAndPlaying, isSameById } from '../../services/player'
import { syncEntities } from '../entities/index'
import { resetToggledF } from '../toggle/index'
import { PLAYLISTTYPE } from '../../constants/toggleTypes'
import random from 'lodash/random'
const setIsPlaying = (isPlaying) => ({
  type: actionTypes.SET_IS_PLAYING
  , isPlaying
})

export const setActiveTrack = (activeTrackId) => ({
  type: actionTypes.SET_ACTIVE_TRACK
  , activeTrackId
})

const setTrackInPlaylist = (trackId) => ({
  type: actionTypes.SET_TRACK_IN_PLAYLIST
  , trackId
})


const removeFromPlaylist = (trackId) => ({
  type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST
  , trackId
})

/** TODO neba  */

const deactivateTrack = () => ({
  type: actionTypes.DEACTIVE_TRACK
})


const getIterateTrackId = (playlist, activeTrackId, iterate) => {
  const index = playlist.findIndex(isSameById(activeTrackId))
  return playlist[(index + iterate)]
}

export const togglePlayTrack = (isPlaying) =>
  dispatch => {
    dispatch(setIsPlaying(isPlaying))
  }


export const activateTrackF = (trackId) =>
  (dispatch, getState) => {
    const player = getState().player
      , preActiveTrackId = player.activeTrackId
      , isPlaying = player.isPlaying
    console.info(player, '---', isPlaying)
    const isAPT = isSameTrackAndPlaying(preActiveTrackId, trackId, isPlaying)
    console.info('isAPT = ', isAPT)
    dispatch(togglePlayTrack(!isAPT))
    dispatch(setActiveTrack(trackId))
    dispatch(setTrackInPlaylist(trackId))
  }


export const addTrackToPlaylistF = (trackId) =>
  (dispath, getState) => {
    const size = getState().player.playlist.length
    if (!size) {
      dispath(setActiveTrack(trackId))
    }
    dispath(setTrackInPlaylist(trackId))
  }

const setIsShuffleMode = (isShuffleMode) => ({
  type: actionTypes.SETSHUFFLEMODE
  , isShuffleMode
})

export const toggleShuffleMode = (isShuffleMode) =>
  (dispatch) => {
    dispatch(setIsShuffleMode(isShuffleMode))
  }

const getShuffleId = (activeTrackId, playlist) => {
  const size = playlist.length
  const nextId = playlist[random(0, size - 1)]
  if (activeTrackId === nextId) {
    return getShuffleId(activeTrackId, playlist)
  } else {
    return nextId
  }
}


export const activeIterateTrack = (activeTrackId, iterate = 1) =>
  (dispatch, getState) => {
    const state = getState();
    const player = state.player
      , tracks = state.entities.tracks
    const playlist = player.playlist
    const isShuffleMode = player.isShuffleMode
    const iterateTrackId = getIterateTrackId(playlist, activeTrackId, iterate)
    let activeTrack = tracks[activeTrackId]
    if (iterateTrackId && isShuffleMode === false) {
      dispatch(setActiveTrack(iterateTrackId))
      dispatch(togglePlayTrack(true))
    } else if (isShuffleMode) {
      const shuffleId = getShuffleId(activeTrackId, playlist);
      dispatch(setActiveTrack(shuffleId))
      dispatch(togglePlayTrack(true))
      activeTrack = tracks[shuffleId]
    } else {
      dispatch(togglePlayTrack(false))
    }
    dispatch(syncEntities(activeTrack, 'tracks'))
  }

export const removeTrackFromPlaylistF = (trackId) =>
  (dispatch, getState) => {
    const player = getState().player
    const preActiveTrackId = player.activeTrackId
    const isAPT = isSameById(preActiveTrackId)(trackId)

    if (isAPT) {
      dispatch(activeIterateTrack(preActiveTrackId))
    }
    // if only one track deactivateTrack
    const playlist = player.playlist
    const playlistSize = playlist.length
    if (playlistSize < 2) {
      dispatch(deactivateTrack())
      dispatch(resetToggledF(PLAYLISTTYPE))
    }
    dispatch(removeFromPlaylist(trackId))
  }
/**
 *  const setPlaylist = (playlist: []) => ({
 *   type: actionTypes.SET_PLAY_LIST
 * , playlist})
 */

const resetPlaylist = () => ({
  type: actionTypes.RESET_PLAYLIST
})

export const clearPlayListF = () =>
  dispatch => {
    dispatch(togglePlayTrack(false))
    dispatch(deactivateTrack())
    dispatch(resetPlaylist())
    dispatch(resetToggledF(PLAYLISTTYPE))
  }

const setAudioMute = (isMute) => ({
  type: actionTypes.TOGGLE_AUDIO_MUTE
  , isMute
})

export const muteOrUnmuteF = (isMute) =>
  dispatch => {
    dispatch(setAudioMute(!isMute))
  }

const changeAudioValue = (value) => ({
  type: actionTypes.SET_VOLUME_VALUE
  , value
})

export const changeVolumeF = (value) =>
  dispatch => {
    dispatch(changeAudioValue(value))
  }
