import { schema } from "normalizr"
import { userSchema } from './user'
const origin = new schema.Entity('origins')
origin.define({
  user: userSchema
})
export default origin
