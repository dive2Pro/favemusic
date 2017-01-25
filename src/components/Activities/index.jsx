import React from 'react'
import FetchOnScroll from '../FetchOnScroll/index'
import {StreamTrackContainer} from '../Track/index'
import LoadingSpinner from '../LoadingSpinner/index'
import map from '../../services/map'
import filter from 'lodash/fp/filter'
const ActivitiesDom = ({
  activities
}: {activities: []}) => (
  <div>
    <ul>
      {map(
        (activity: number, idx: number): number => {
          return (
            <li key={activity.id + "-" + idx}>
              <StreamTrackContainer
                idx={idx}
                activity={activity}
              />
            </li>)
        }
        , activities)
      }
    </ul>
  </div>
)

const ActivitiesRequestDom = (requestInProcess: Boolean) => {
  if (requestInProcess) {
    return (<LoadingSpinner isLoading={requestInProcess} />)
  } else {
    return (<div>...</div>)
  }
}
const getMatchedEntities = (ids, entities) => {
  return map(id => entities[id], ids)
}
const ActivitiesContainer = ({
  activitiesIds
  , requestInProcess
  , trackEntities
  , activeFilter
  , sortFunc
}: ActivitiesPropsType) => {
  const matchedEntities = getMatchedEntities(activitiesIds, trackEntities)
  const filterEntities = filter(activeFilter, matchedEntities)
  const sortedEntities = sortFunc(filterEntities)
  return (
    <div>
      <ActivitiesDom
        activities={sortedEntities} />
      <ActivitiesRequestDom
        requestInProcess={requestInProcess
        || !activitiesIds} />
    </div>
  )
}
export default FetchOnScroll(ActivitiesContainer);
