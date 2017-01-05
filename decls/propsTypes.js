/* /decl/data.js.flow */

declare type basePropsType = {
  pathname: string,
  genre: string,
  currentUser: Object,
  activeTrack: TrackType,
  isPlaying: boolean,
  followings: Array<*>,
  activities: Array<*>,
  activitiesNextHref: string,
  activitiesRequestInProcess: boolean,
  followers: Array<*>,
  followersNextHref: string,
  followersRequestInProcess: boolean,
  favorites: Array<*>,
  favoritesRequestInProcess: boolean,
  fetchActivities:(nexfHref: string)=>void,
  nextHref: string,
  fetchActivitiesByGenre: (nextHref: string, genre: string)=>void,
  addTrackToPlaylist:(track: TrackType)=>void,
  activitiesByGenreNextHref:{},
  activitiesByGenre: string
  , activitiesByGenreInProcess: boolean
  , init: ()=>void
  , fetchFollowers: ()=>void
  , activateTrack: (track: TrackType)=>void
  , likeF: (track: TrackType)=>void
  , fetchFavoritesF:(user: UserType, nextHref: String)=>void
};
