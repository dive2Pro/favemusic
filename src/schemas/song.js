import { schema } from "normalizr"
import user from './user'
import origin from './origin'
const song = new schema.Entity('songs')
// const track

song.define({
  origin
  , user
})
export default song
