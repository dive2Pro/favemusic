declare type UserType = {
  username: string,
  avatar_url: string,
  permalink_url: string,
  followings_count: number,
  followers_count: number,
  track_count: number
};
declare type TrackType = {
  title: string,
  avatar_url: string,
  permalink_url: string,
  artwork_url:string,
  playback_count: number,
  favoritings_count: number,
  comment_count: number,
  origin: originType
};
