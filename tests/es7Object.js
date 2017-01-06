/**
 * Created by hyc on 17-1-4.
 */

function mutateTest(obj, key, value) {
  return { ...obj, [key]: value }
}
function mutateArrayTest(obj, key = 'psw', arr) {
  // return Object.assign({}, obj, { [key]: obj[key].concat(arr) })
  const psws = [...obj[key], ...arr]
  return Object.assign({}, obj, { psw: psws })
}
function mutateArrayPushTest(obj, key = 'psw', arr) {
  // return Object.assign({}, obj, { [key]: obj[key].concat(arr) })
  const psws = [...obj[key], arr]
  return Object.assign({}, obj, { psw: psws })
}

const initState = {
  user: null
  , name: null
  , psw: []
}

const mutateResult = mutateTest(initState, 'user', 'hyc')
console.info(mutateResult, initState)
console.log('-------------------------')
const mutateArrayResult = mutateArrayTest(initState, 'psw', ['name', 'psw', 'say'])
console.info(initState, mutateArrayResult)

const mutateArrayPushResult = mutateArrayPushTest(initState, 'psw', 'name')
console.info(initState, mutateArrayPushResult)


