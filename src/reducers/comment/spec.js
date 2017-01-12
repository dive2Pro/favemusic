/**
 * Created by hyc on 17-1-12.
 */
import comment from './index'
import {
  MERGE_COMMENTS_OF_ID,
  SET_COMMENTS_REQUEST_NEXT_HREF_BY_ID
} from '../../constants/actionTypes'

describe('Comment Reducer Test', () => {
  it('MERGE_COMMENTS_OF_ID, there are no commentsIds', () => {
    const initState = {}
    const commentsIds = [
      {
        a1: { body: 'ah' }
      }
      , { a2: { body: 'so' } }
      , { a3: { body: 'qpo' } }
    ]
    const trackId = 2222
    const action = {
      type: MERGE_COMMENTS_OF_ID
      , commentsIds
      , trackId
    }
    const result = comment(initState, action)
    const expected = {
      [trackId]: {
        commentsIds
      }
    }
    expect(result).to.deep.eq(expected)
  })
  it('MERGE_COMMENTS_OF_ID, add some commentsIds within same Id', () => {
    const preComments = [
      { b1: { body: 'b1' } }
      , { b2: { body: 'b1' } }
      , { b3: { body: 'b1' } }
    ]
    const initState = {
      2222: {
        commentsIds: preComments
      }
    }
    const commentsIds = [
      { a1: { body: 'ah' } }
      , { a2: { body: 'so' } }
      , { a3: { body: 'qpo' } }
    ]
    const trackId = 2222
    const action = {
      type: MERGE_COMMENTS_OF_ID
      , commentsIds
      , trackId
    }
    const result = comment(initState, action)
    const expected = {
      [trackId]: {
        commentsIds: [...preComments, ...commentsIds]
      }
    }
    expect(result[trackId]).to.deep.eq(expected[trackId])
  })
  it('SET_COMMENTS_REQUEST_NEXT_HREF_BY_ID, there are data do not have the nextHref', () => {
    const preComments = [
      { b1: { body: 'b1' } }
      , { b2: { body: 'b1' } }
      , { b3: { body: 'b1' } }
    ]
    const initState = {
      2222: {
        commentsIds: preComments
      }
    }
    const nextHref = 'www.google.com'
    const trackId = 2222
    const action = {
      type: SET_COMMENTS_REQUEST_NEXT_HREF_BY_ID
      , nextHref
      , trackId
    }
    const result = comment(initState, action)
    const expected = {
      [trackId]: {
        commentsIds: preComments
        , nextHref
      }
    }
    expect(result).to.deep.eq(expected)
  })
  it('SET_COMMENTS_REQUEST_NEXT_HREF_BY_ID, there are data  have the nextHref', () => {
    const preComments = [
      { b1: { body: 'b1' } }
      , { b2: { body: 'b1' } }
      , { b3: { body: 'b1' } }
    ]
    const preNextHref = 'www.google.com'
    const initState = {
      2222: {
        commentsIds: preComments
        , nextHref: preNextHref
      }
    }
    const trackId = 2222
    const nextHref = ' www.yahoo.com'
    const action = {
      type: SET_COMMENTS_REQUEST_NEXT_HREF_BY_ID
      , nextHref
      , trackId
    }
    const result = comment(initState, action)
    const expected = {
      [trackId]: {
        commentsIds: preComments
        , nextHref
      }
    }
    expect(result).to.deep.eq(expected)
  })
})
