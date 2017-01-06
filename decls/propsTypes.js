 declare type basePropsType = {
  pathname: string
  , genre: string
  , currentUser: Object
  , activeTrack: TrackType
  , isPlaying: boolean
  , followings: Array<*>
  , activities: Array<*>
  , activitiesNextHref: string
  , activitiesRequestInProcess: boolean
  , followers: Array<*>
  , followersNextHref: string
  , followersRequestInProcess: boolean
  , favorites: Array<*>
  , followingsNextHref: string
  , favoritesRequestInProcess: boolean
  , followingsRequestInProcess: boolean
  , fetchActivities:(nexfHref: string)=>void
  , nextHref: string
  , fetchActivitiesByGenre: (nextHref: string, genre: string)=>void
  , addTrackToPlaylistF:(track: TrackType)=>void
  , activitiesByGenreNextHref:{}
  , activitiesByGenre: string
  , activitiesByGenreInProcess: boolean
  , init: ()=>void
  , fetchFollowersF: ()=>void
  , activateTrackF: (track: TrackType)=>void
  , likeF: (track: TrackType)=>void
  , fetchFavoritesF:(user: UserType, nextHref: String)=>void
  , fetchFollowingsF:(user: UserType, nextHref: String)=>void
  , favoritesNextHref: string
};
