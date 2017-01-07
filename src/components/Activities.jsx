// @flow
import React, { Component } from 'react'
import FetchOnScroll from './FetchOnScroll'
import Track from '../components/Track'
import LoadingSpinner from '../components/LoadingSpinner'

class ActivitiesContainer extends Component {
  props: basePropsType;

  activitiesDom(): HTMLElement {
    const { activitiesIds, users, activateTrackF, activeTrackId
      , isPlaying, addTrackToPlaylistF, tracks, songs } = this.props
    return (activitiesIds &&
      <div>
        <h2>activities</h2>
        <ul>
          {activitiesIds.map(
            (id: number, idx: number): number => {
              const song = songs[id]
              const track = tracks[song.id]
              const user = users[track.user]
              return (
                <li key={idx}>
                  <Track
                    song={song}
                    idx={idx}
                    user={user}
                    track={track}
                    activeTrackId={activeTrackId}
                    activateTrackF={activateTrackF}
                    isPlaying={isPlaying}
                    addTrackToPlaylistF={addTrackToPlaylistF}
                    />
                </li>)
            }
          )
          }
        </ul>
      </div>
    )
  }

  activitiesRequestDom(): HTMLElement {
    const { requestInProcess } = this.props
    if (requestInProcess) {
      return (<div><LoadingSpinner isLoading={requestInProcess} /></div>)
    } else {
      return (<div>...</div>)
    }
  }

  render() {
    return (
      <div>
        <div>{this.activitiesDom()}</div>
        <div>{this.activitiesRequestDom()}</div>
      </div>
    )
  }
}

export default FetchOnScroll(ActivitiesContainer);
