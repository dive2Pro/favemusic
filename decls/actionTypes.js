declare type Action<T> = {
  type: T
}

declare type BrowseActionType = {
  type: Action,
  nextHref: string,
  genre: string,
  activities: Array,
  inProcess: boolean
}

declare type BrowseSetNextHrefActionType = {
  type: Action,

  nextHref: string,
  genre: string
};

declare type BrowseMergeActionType = {
  type: Action,
  activities: Array
};
declare type BrowseSetInProcessfActionType = {
  type: Action,
  inProcess: boolean
};

declare type RequestType<T> = {
  type:Action
  , requestType:string
  , inProcess: boolean
}

declare type PaginateActionType<T> = {
  type:Action
  , paginateLink:string
  , nextHref:string
}
