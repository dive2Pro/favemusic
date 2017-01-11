import Permalink from './Permalink'

describe('Permalink Test', () => {
  it('render', done => {
    const props = {
      href: 'www.bai.com'
      , text: 'huangshang'
    }

    const element = shallow(<Permalink {...props} />)
    expect(element.find('a')).to.have.length(1)
    expect(element.find('a').text()).to.eq(props.text)
    expect(element.find('a').prop('href')).to.eq(props.href)

    done()
  }
  )
}
)
