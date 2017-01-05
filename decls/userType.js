declare type originType = {
  tag_list: string,
  user: UserType,
  user_favorite,
  id: number
}
declare type ActivityType = {
  origin: originType
};

declare type ResponseType = {};
declare type ResponseAfterToJSONType = {
  collection:Array<*>
};

declare type UserType = {
  username: string,
  avatar_url:string,
  permalink_url:string
};
