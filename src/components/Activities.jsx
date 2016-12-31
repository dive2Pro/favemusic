import React, { Component } from 'react'

export default class ActivitiesContainer extends Component {
  render () {
    const { activities }=this.props
    console.info('activities= ',activities)
    return (
      <div>
        <h2>activities</h2>
        <ul>
          {activities.map((act, idx) => {
            return (
              <li key={idx}>act.username</li>
            )
          })}
        </ul>
      </div>
    )
  }
}