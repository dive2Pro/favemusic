import Artwork from './Artwork'

describe('Artwork Test', () => {
  it('render,when image is empty ', done => {

    const props = {
      alt: 'name'
      , image: null
      , optionalImg: 'www.google.com'
      , size: 80
    }

    const element = shallow(<Artwork {...props} />)
    expect(element.find('img')).to.have.length(1)
    expect(element.find('img').prop('src')).to.eq(props.optionalImg)
    expect(element.find('img').prop('height')).to.eq(props.size)
    expect(element.find('img').prop('width')).to.eq(props.size)
    expect(element.find('img').prop('alt')).to.eq(props.alt)
    done()
  }
  )
  it('render,when image is not empty ', done => {

    const props = {
      alt: 'name'
      , image: 'www.image.com'
      , optionalImg: 'www.google.com'
      , size: 80
    }

    const element = shallow(<Artwork {...props} />)
    expect(element.find('img')).to.have.length(1)
    expect(element.find('img').prop('src')).to.eq(props.image)
    expect(element.find('img').prop('height')).to.eq(props.size)
    expect(element.find('img').prop('width')).to.eq(props.size)
    expect(element.find('img').prop('alt')).to.eq(props.alt)
    done()
  }
  )
}
)
