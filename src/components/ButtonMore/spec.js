import ButtonMore from './index'

describe('Test ButtonMore Component', () => {
  let props;
  beforeEach(() => {
    props = {
      isHidden: true
      , fetchComment: () => { }
      , nextHref: 'www.google.com'
      , requestInProcess: false
    }
  })

  it('ButtonMore is render', done => {
    const element = shallow(<ButtonMore {...props} />)
    expect(element.find('ButtonGhost')).to.have.length(1)
    done()
  }
  )
  it('ButtonMore, does no render when lis is collapsed ', done => {
    props.isHidden = false
    const element = shallow(<ButtonMore {...props} />)
    expect(element.find('ButtonGhost')).to.have.length(0)
    done()
  }
  )
  it('ButtonMore, does no render when nextHref is empty ', done => {
    props.nextHref = null
    const element = shallow(<ButtonMore {...props} />)
    expect(element.find('ButtonGhost')).to.have.length(0)
    done()
  }
  )
  it('ButtonMore , render a LoadingSpinner when requestInProcess is inProcess ', done => {
    props.requestInProcess = true
    const element = shallow(<ButtonMore {...props} />)
    expect(element.find('LoadingSpinner')).to.have.length(1)
    done()
  }
  )
}
