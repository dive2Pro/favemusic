import React, { Component } from 'react'
import FetchOnScroll from './FetchOnScroll'
import Track from '../components/Track'

class ActivitiesContainer extends Component {
  activitiesDom () {
    const { activities }=this.props
    console.info('activities= ', activities)
    return (
      <div>
        <h2>activities</h2>
        <ul>
          {activities.map((act, idx) => {
            return (
              <li key={idx}>
                <Track activity={act.toJSON()}/>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  activitiesRequestDom () {
    const { activitiesRequestInProcess } = this.props
    if (activitiesRequestInProcess) {
      return (<div>Loading</div>)
    } else {
      return (<div>...</div>)
    }
  }

  render () {
    return (
      <div>
        <div>{this.activitiesDom()}</div>
        <div>{this.activitiesRequestDom()}</div>
      </div>
    )
  }
}

export default FetchOnScroll(ActivitiesContainer);
