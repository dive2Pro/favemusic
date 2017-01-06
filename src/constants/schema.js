import { schema } from "normalizr"

const user = new schema.Entity('users')
const song = new schema.Entity('songs')

song.define({
  origin: new schema.Array(user)
})

export const userSchema = user
export const songSchema = song
