/**
 * Created by hyc on 17-1-12.
 */
import { schema } from 'normalizr'
import user from './user'
const commentSchema = new schema.Entity('comments')
commentSchema.define({
  user
})

export { commentSchema }

