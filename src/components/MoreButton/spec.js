import MoreButton from './index'

describe('Test MoreButton Component', () => {
  let props;
  beforeEach(() => {
    props = {
      isHidden: true
      , fetchComment: () => { }
      , nextHref: 'www.google.com'
      , requestInProcess: false
    }
  })

  it('MoreButton is render', done => {
    const element = shallow(<MoreButton {...props} />)
    expect(element.find('.ghost')).to.have.length(1)
    done()
  }
  )
  it('MoreButton, does no render when lis is collapsed ', done => {
    props.isHidden = false
    const element = shallow(<MoreButton {...props} />)
    expect(element.find('.ghost')).to.have.length(0)
    done()
  }
  )
  it('MoreButton, does no render when nextHref is empty ', done => {
    props.nextHref = null
    const element = shallow(<MoreButton {...props} />)
    expect(element.find('.ghost')).to.have.length(0)
    done()
  }
  )
  it('MoreButton , render a LoadingSpinner when requestInProcess is inProcess ', done => {
    props.requestInProcess = true
    const element = shallow(<MoreButton {...props} />)
    expect(element.find('LoadingSpinner')).to.have.length(1)
    done()
  }
  )
}
