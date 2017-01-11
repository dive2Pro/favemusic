import List, {
  renderUser, renderTrack, renderChevron
  , renderNextButton, renderMosaic
} from './List'

describe('Test List Component', () => {
  let props;
  beforeEach(() => {
    props = {
      ids: [1, 2, 3, 4, 5, 6, 7]
      , isExpanded: false
      , title: 'Foo'
      , kind: 'Any'
      , requestInProcess: false
      , entities: { 1: { name: 'x' }, 2: { name: 'y' } }
      , toggleExpandF: () => { }
      , nextHref: '/foo'
      , fetchMoreF: () => { }
    }
  })
  it('renders', done => {
    const element = shallow(<List {...props} />)
    expect(element.find('.list')).to.have.length(1)
    expect(element.find('.more-visible')).to.have.length(0)
    done()
  }
  )
  it('shows expanded content', done => {
    props.isExpanded = true
    const element = shallow(<List {...props} />)
    expect(element.find('.list')).to.have.length(1)
    expect(element.find('.more-visible')).to.have.length(1)
    done()
  }
  )
}
)
