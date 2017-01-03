// @flow
import React, { Component } from 'react'
import FetchOnScroll from './FetchOnScroll'
import Track from '../components/Track'
type ActivityType = {

};
class ActivitiesContainer extends Component {
  activitiesDom(): HTMLElement {
    const { activities, activateTrack } = this.props
    console.info('activities= ', activities)
    return (
      <div>
        <h2>activities</h2>
        <ul>
          {activities.map((act: ActivityType, idx: number) : number => {
            return (
              <li key={idx}>
                <Track activity={act.toJSON()} idx={idx} activateTrack={activateTrack} {...this.props} />
              </li>)
          }
        )
          }
        </ul>
      </div>
    )
  }

  activitiesRequestDom(): HTMLElement {
    const { activitiesRequestInProcess } = this.props
    if (activitiesRequestInProcess) {
      return (<div>Loading</div>)
    } else {
      return (<div>...</div>)
    }
  }

  render(): React$Element {
    return (
      <div>
        <div>{this.activitiesDom()}</div>
        <div>{this.activitiesRequestDom()}</div>
      </div>
    )
  }
}

export default FetchOnScroll(ActivitiesContainer);
