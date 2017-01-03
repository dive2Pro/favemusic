// @flow
import React, { Component } from 'react'
import FetchOnScroll from './FetchOnScroll'
import Track from '../components/Track'
import LoadingSpinner from '../components/LoadingSpinner'
type ActivityType = {};
class ActivitiesContainer extends Component {
  activitiesDom(): HTMLElement {
    const { activities, activateTrack } = this.props
    const list = Array.isArray(activities) ? activities : activities.toJSON()
    return (
      <div>
        <h2>activities</h2>
        <ul>
          {list.map(
            (act: ActivityType, idx: number): number => {
              return (
                <li key={idx}>
                  <Track activity={act} idx={idx} activateTrack={activateTrack} {...this.props} />
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
      return (<div><LoadingSpinner /></div>)
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
