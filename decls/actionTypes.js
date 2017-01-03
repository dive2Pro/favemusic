
declare type BrowseActionType = {
  type: string,
  nextHref: string,
  genre: string,
  activities: Array,
  inProcess: boolean
}

declare type BrowseSetNextHrefActionType = {
  type: string,
  nextHref: string,
  genre: string
};

declare type BrowseMergeActionType = {
  type: string,
  activities: Array
};
declare type BrowseSetInProcessfActionType = {
  type: string,
  inProcess: boolean
};
