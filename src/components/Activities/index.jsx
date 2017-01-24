import React from 'react'
import FetchOnScroll from '../FetchOnScroll/index'
import {StreamTrackContainer} from '../Track/index'
import LoadingSpinner from '../LoadingSpinner/index'
import map from '../../services/map'

const ActivitiesDom = ({
  activitiesIds
  , activeTrackId
  , trackEntities
  , activeFilter
}: {activitiesIds: [], activeTrackId: number}) => (
  <div>
    <ul>
      {activitiesIds && map(
        (id: number, idx: number): number => {
          const activity = trackEntities[id]
          if (!activeFilter(activity)) {
            return null;
          }
          return (
            <li key={id + "-" + idx}>
              <StreamTrackContainer
                idx={idx}
                id={id}
                activeTrackId={activeTrackId}
              />
            </li>)
        }
        , activitiesIds)
      }
    </ul>
  </div>
)

const ActivitiesRequestDom = (requestInProcess: true) => {
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
  , trackEntities
  , activeFilter
}: ActivitiesPropsType) => (
  <div>
    <ActivitiesDom
      trackEntities={trackEntities}
      activitiesIds={activitiesIds}
      activeFilter={activeFilter}
      activeTrackId={activeTrackId} />
    <ActivitiesRequestDom requestInProcess={requestInProcess || !activitiesIds} />
  </div>
)
export default FetchOnScroll(ActivitiesContainer);
