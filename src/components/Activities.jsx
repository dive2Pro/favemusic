// @flow
import React from 'react'
import FetchOnScroll from './FetchOnScroll'
import TrackContainer from '../components/Track'
import LoadingSpinner from '../components/LoadingSpinner'

const ActivitiesDom = ({ activitiesIds, activeTrackId }: {}) =>
  (activitiesIds &&
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

const ActivitiesRequestDom = (requestInProcess: boolean) => {
  if (requestInProcess) {
    return (<LoadingSpinner isLoading={requestInProcess} />)
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
      <ActivitiesDom activitiesIds={activitiesIds} activeTrackId={activeTrackId} />
      <ActivitiesRequestDom requestInProcess={requestInProcess} />
    </div >
  )
}

export default FetchOnScroll(ActivitiesContainer);
