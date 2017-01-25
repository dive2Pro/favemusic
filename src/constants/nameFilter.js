/**
 * Created by Administrator on 2017/1/25 0025.
 */

const nameFilter = (query) =>
  (activity) => {
    const name = activity.title.toLowerCase().trim()
    return name.indexOf(query) > -1
  }

export { nameFilter }
