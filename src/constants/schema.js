import { schema } from "normalizr"

const user = new schema.Entity('users')
const song = new schema.Entity('songs')
// const track

const origin = new schema.Entity('origins')
origin.define({
  user
})
song.define({
  origin
  , user
})
export const userSchema = user
export const songSchema = song
