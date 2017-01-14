/**
 * Created by hyc on 17-1-12.
 */
import { schema } from 'normalizr'
import { userSchema } from './user'
const commentSchema = new schema.Entity('comments')
commentSchema.define({
  user: userSchema
})

export { commentSchema }

