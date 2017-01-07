// @flow
import React from 'react'
import FetchOnScroll from './FetchOnScroll'
import TrackContainer from '../components/Track'
import LoadingSpinner from '../components/LoadingSpinner'

function activitiesDom(activitiesIds: [], activeTrackId: number) {
  return (activitiesIds &&
    <div>
      <h2>activities</h2>
      <ul>
        {activitiesIds.map(
          (id: number, idx: number): number => {
            return (
              <li key={idx}>
                <TrackContainer
                  idx={idx}
                  id={id}
                  activeTrackId={activeTrackId}
                  />
              </li>)
          }
        )
        }
      </ul>
    </div>
  )
}

function activitiesRequestDom(requestInProcess: boolean) {
  if (requestInProcess) {
    return (<div><LoadingSpinner isLoading={requestInProcess} /></div>)
  } else {
    return (<div>...</div>)
  }
}

const ActivitiesContainer = ({
  activitiesIds
  , activeTrackId
  , requestInProcess
}: Object) => {
  return (
    <div>
      <div>{activitiesDom(activitiesIds, activeTrackId)}</div>
      <div>{activitiesRequestDom(requestInProcess)}</div>
    </div>
  )
}

export default FetchOnScroll(ActivitiesContainer);
