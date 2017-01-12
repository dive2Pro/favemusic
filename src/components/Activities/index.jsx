import React from 'react'
import FetchOnScroll from '../FetchOnScroll/index'
import { StreamTrackContainer } from '../Track/index'
import LoadingSpinner from '../LoadingSpinner/index'
import map from '../../services/map'

const ActivitiesDom = ({ activitiesIds, activeTrackId }: { activitiesIds: [], activeTrackId: number }) =>
  (<div>
    <h2>activities</h2>
    <ul>
      {activitiesIds && map(
        (id: number, idx: number): number => {
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
}: ActivitiesPropsType) =>
  (<div>
    <ActivitiesDom activitiesIds={activitiesIds} activeTrackId={activeTrackId} />
    <ActivitiesRequestDom requestInProcess={requestInProcess} />
  </div >
  )
export default FetchOnScroll(ActivitiesContainer);
