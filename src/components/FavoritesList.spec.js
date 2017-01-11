import { FavoritesContainer } from './FavoritesList'

describe('FavoritesContainer', () => {
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
    const element = shallow(<FavoritesContainer props={props} />)
    expect(element.find('List')).to.have.length(1)
    done()
  }
  )
}
)
