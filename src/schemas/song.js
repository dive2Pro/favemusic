import { schema } from "normalizr"
import user from './user'
import origin from './origin'
const songSchema = new schema.Entity('songs')
// const track

songSchema.define({
  origin
  , user
})

export { songSchema }
