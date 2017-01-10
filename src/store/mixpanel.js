/**
 * Created by hyc on 17-1-10.
 */
import mixpanel from 'rn-redux-mixpanel'
import {
  SET_USER, MERGE_ACTIVITIES, MERGE_ACTIVITIES_BY_GENRE
  , MERGE_FAVORITES, MERGE_FOLLOWERS, MERGE_SONGS_ENTITIES, MERGE_TRACK_ENTITIES
  , MERGE_USER_ENTITIES, SET_PAGINATE_LINK, SET_TOGGLED, RESET_TOGGLED
  , SET_REQUESTTYPE_IN_PROCESS, SYNC_ENTITEIS
} from '../constants/actionTypes'
const blacklist = [SET_USER, MERGE_ACTIVITIES, MERGE_ACTIVITIES_BY_GENRE
  , MERGE_FAVORITES, MERGE_FOLLOWERS, MERGE_SONGS_ENTITIES, MERGE_TRACK_ENTITIES
  , MERGE_USER_ENTITIES, SET_PAGINATE_LINK, SET_TOGGLED, RESET_TOGGLED
  , SET_REQUESTTYPE_IN_PROCESS, SYNC_ENTITEIS]

function generateUserData(user) {
  return {
    $permalink: user.permalink
    , $permalink_url: user.permalink_url
    , $username: user.username
  }
}

export default mixpanel({
  // ignoreAction: (action) => (blacklist.indexOf(action.type) < -1)
  ignoreAction: (action) => action.type !== blacklist
  , token: '7b960acd9f79aa68a69313406b38e8c2'
  , selectEventName: (action) => action.type
  , selectDistinctId: (action, state) => {
    if (state.auth && state.auth.user && state.auth.user.permalink) {
      return state.auth.user.permalink_url
    } else {
      return "NO_USER"
    }
  }
  , selectUserProfileData: (action, state) => {
    let user;
    if (state.auth.user) {
      user = state.session.user
    }
    if (action.type === SET_USER) {
      user = action.user
    }
    if (user) {
      return generateUserData(user)
    }
  }
})

