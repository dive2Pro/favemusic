/**
 * Created by Administrator on 2017/1/23 0023.
 */
import some from 'lodash/fp/some'
import every from 'lodash/fp/every'

const getOrCombined = (filters) =>
  (obj) =>
  // https://github.com/lodash/lodash/blob/3.10.1/lodash.src.js#L6403
    some((fn) => {
      console.info('fn-----', fn)
      return fn(obj)
    }, filters)

const getAndCombined = (filters) =>
  (obj) =>
    every((fn) => {
      return fn(obj)
    }, filters)

export { getAndCombined, getOrCombined }
