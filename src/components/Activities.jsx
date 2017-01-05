// @flow
import React, { Component } from 'react'
import FetchOnScroll from './FetchOnScroll'
import Track from '../components/Track'
import LoadingSpinner from '../components/LoadingSpinner'
type ActivityType = {
  activities: Array,
  isPlaying: boolean,
  activateTrack: Function,
  addTrackToPlaylist: Function
};
class ActivitiesContainer extends Component {
  props: ActivityType;

  activitiesDom(): HTMLElement {
    const { activities, activateTrack, isPlaying, addTrackToPlaylist } = this.props
    const list = Array.isArray(activities) ? activities : (activities)
    return (
      <div>
        <h2>activities</h2>
        <ul>
          {list.map(
            (act: ActivityType, idx: number): number => {
              return (
                <li key={idx}>
                  <Track
                    activity={act}
                    idx={idx}
                    activateTrack={activateTrack}
                    isPlaying={isPlaying}
                    addTrackToPlaylist={addTrackToPlaylist}
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
