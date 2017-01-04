/* /decl/data.js.flow */
import ImmutablePropTypes from 'react-immutable-proptypes'

declare type basePropsType = {
  pathname: string,
  genre: string,
  currentUser: Object,
  activeTrack: Object,
  isPlaying: boolean,
  followings: ImmutablePropTypes.list,
  activities: ImmutablePropTypes.list,
  activitiesNextHref: string,
  activitiesRequestInProcess: boolean,
  followers: ImmutablePropTypes.list,
  followersNextHref: string,
  followersRequestInProcess: boolean,
  favorites: ImmutablePropTypes.list,
  favoritesRequestInProcess: boolean,
  fetchActivities:(nexfHref: string)=>void,
  nextHref: string,
  fetchActivitiesByGenre: (nextHref: string, genre: string)=>void,
  activitiesByGenreNextHref:ImmutablePropTypes.map,
  activitiesByGenre: string,
  activitiesByGenreInProcess: boolean,
  init: ()=>void,
  fetchFollowers: ()=>void
};
