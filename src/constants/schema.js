import { schema } from "normalizr"

const user = new schema.Entity('users')
const song = new schema.Entity('songs')
song.define({
  user
})

export const userSchema = user
export const songSchema = song
