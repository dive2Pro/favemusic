import React from 'react'
import FetchOnScroll from './FetchOnScroll'
import { StreamTrackContainer } from '../components/TrackContainer'
import LoadingSpinner from '../components/LoadingSpinner'
import map from 'lodash/map'
const ActivitiesDom = ({ activitiesIds, activeTrackId }: { activitiesIds: [], activeTrackId: number }) =>
  (<div>
    <h2>activities</h2>
    <ul>
      {activitiesIds && map(activitiesIds,
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
      )
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
