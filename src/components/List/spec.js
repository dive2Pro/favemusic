import List, {
  Chevron
  , NextButton, Mosaic
} from './index'

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
  it('shows a title ', done => {
    props.isExpanded = true
    const element = shallow(<List {...props} />)
    expect(element.find('.list')).to.have.length(1)
    expect(element.find('a').text()).to.contain(props.title)
    done()
  }
  )
}
)

describe('Test Chevron Component', () => {
  let props;
  beforeEach(() => {
    props = {
      ids: [1, 2, 3, 4, 5, 6, 7]
      , isExpanded: false
    }
  })
  it('Chevron have i', done => {
    const element = shallow(<Chevron {...props} />)
    expect(element.find('i')).to.have.length(1)
    done()
  }
  )
  it('Chevron div ', done => {
    props.ids = [1, 2, 3]
    const element = shallow(<Chevron {...props} />)
    expect(element.find('i')).to.have.length(0)
    expect(element.find('div')).to.have.length(1)
    done()
  }
  )
  it('shows fa-chevron-up  ', done => {
    props.isExpanded = true
    const element = shallow(<Chevron {...props} />)
    expect(element.find('.fa-chevron-up')).to.have.length(1)
    done()
  }
  )
  it('shows fa-chevron-down  ', done => {
    props.isExpanded = false
    const element = shallow(<Chevron {...props} />)
    expect(element.find('.fa-chevron-down')).to.have.length(1)
    done()
  }
  )
}
)
describe('Test Mosaic Component', () => {
  let props;
  beforeEach(() => {
    props = {
      ids: [1, 2, 3, 4, 5, 6, 7]
      , isExpanded: false
      , kind: 'user'
      , requestInProcess: false
      , entities: { 1: { name: 'x' }, 2: { name: 'y' } }
    }
  })
  it('Mosaic is loading', done => {
    props.requestInProcess = true
    const element = shallow(<Mosaic {...props} />)
    expect(element.find('LoadingSpinner')).to.have.length(1)
    expect(element.find('.item')).to.have.length(0)

    props.ids = null
    props.requestInProcess = false
    const element2 = shallow(<Mosaic {...props} />)
    expect(element2.find('LoadingSpinner')).to.have.length(1)
    expect(element.find('UserItemContainer')).to.have.length(0)
    done()
  }
  )
  it('Mosaic specific item user according  to length of ids ', done => {
    const element = shallow(<Mosaic {...props} />)
    expect(element.find('SpecificUserItem')).to.have.length(props.ids.length)
    done()
  }
  )
  it('Mosaic specific item track according  to length of ids ', done => {
    props.kind = 'track'
    const element = shallow(<Mosaic {...props} />)
    expect(element.find('SpecificTrackItem')).to.have.length(props.ids.length)
    done()
  }
  )
}
)

describe('Test NextButton Component', () => {
  let props;
  beforeEach(() => {
    props = {
      ids: [1, 2, 3, 4, 5, 6, 7]
      , isExpanded: true
      , user: 'hyc'
      , fetchMoreF: () => { }
      , nextHref: 'www.google.com'
      , requestInProcess: false
    }
  })
  it('NextButton is render', done => {
    const element = shallow(<NextButton {...props} />)
    expect(element.find('.ghost')).to.have.length(1)
    done()
  }
  )
  it('NextButton, does no render when lis is collapsed ', done => {
    props.isExpanded = false
    const element = shallow(<NextButton {...props} />)
    expect(element.find('.ghost')).to.have.length(0)
    done()
  }
  )
  it('NextButton, does no render when nextHref is empty ', done => {
    props.nextHref = null
    const element = shallow(<NextButton {...props} />)
    expect(element.find('.ghost')).to.have.length(0)
    done()
  }
  )
  it('NextButton , render a LoadingSpinner when requestInProcess is inProcess ', done => {
    props.requestInProcess = true
    const element = shallow(<NextButton {...props} />)
    expect(element.find('LoadingSpinner')).to.have.length(1)
    done()
  }
  )
}
)
