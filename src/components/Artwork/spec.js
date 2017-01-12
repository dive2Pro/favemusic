import Artwork from './index'

describe('Artwork Test', () => {
  it('render, show img with src equal image  ', done => {
    const props = {
      alt: 'hyc'
      , image: 'www.baidu'
      , optionalImg: 'www.google'
      , size: 19
    }

    const element = shallow(<Artwork {...props} />)
    expect(element.find('img')).to.have.length(1)
    expect(element.find('img').prop('alt')).to.eq(props.alt)
    expect(element.find('img').prop('src')).to.eq(props.image)
    expect(element.find('img').prop('height')).to.eq(props.size)
    expect(element.find('img').prop('width')).to.eq(props.size)

    done()
  }
  )
  it('render, show img with src equal optionalImg  ', done => {
    const props = {
      alt: 'hyc'
      , image: null
      , optionalImg: 'www.google'
      , size: 19
    }

    const element = shallow(<Artwork {...props} />)
    expect(element.find('img')).to.have.length(1)
    expect(element.find('img').prop('alt')).to.eq(props.alt)
    expect(element.find('img').prop('src')).to.eq(props.optionalImg)
    expect(element.find('img').prop('height')).to.eq(props.size)
    expect(element.find('img').prop('width')).to.eq(props.size)

    done()
  }
  )
}
)

