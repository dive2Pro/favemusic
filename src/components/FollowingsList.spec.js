import { FollowingsList } from './FollowingsList'

describe('FollowingsList', () => {
  it('render', done => {
    const props = {
      title: 'ti'
      , toggleExpandF: () => { }
      , isExpanded: false
      , nextHref: 'www.'
      , user: 123
      , requestInProcess: false
      , entities: [
        { x: 'x1' }, { y: 'y1' }
      ]
      , ids: [
        {
          id1: 'x'
        }
        , {
          id2: 'y'
        }
      ], kind: 'foo'
    }
    const element = shallow(<FollowingsList props={props} />)
    expect(element.find('List')).to.have.length(1)
    done()
  }
  )
}
)
