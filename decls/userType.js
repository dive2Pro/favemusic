declare type originType = {
  tag_list: string
}
declare type ActivityType = {
  origin: originType
};

declare type ResponseType = {};
declare type ResponseAfterToJSONType = {
  collection:Array<*>
};

declare type UserType = {
  username: string, avatar_url:string, permalink_url:string
};
