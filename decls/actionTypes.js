declare type Action = {
  type: string
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

declare type RequestType = {
  type:Action
  , requestType:string
  , inProcess: boolean
}

declare type PaginateActionType = {
  type:Action
  , paginateLink:string
  , nextHref:string
}
