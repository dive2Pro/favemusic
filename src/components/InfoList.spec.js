import InfoList, { InfoItem } from './InfoList'

describe('InfoList Test', () => {
  it('render', done => {
    const infoConfigurations = [
      { x: 'x' }
      , { y: 'y' }
    ]
    const props = {
      infoConfigurations
    }

    const element = shallow(<InfoList {...props} />)
    expect(element.find('.info-list')).to.have.length(1)
    expect(element.find('InfoItem')).to.have.length(infoConfigurations.length)
    done()
  }
  )
}
)

describe('InfoItem Test', () => {
  it('render', done => {
    const info = { className: 'x', count: 5 }

    const props = {
      info
      , idx: 1
    }

    const element = shallow(<InfoItem {...props} />)
    expect(element.find('.info-list-item')).to.have.length(1)
    expect(element.find('i').prop('className')).to.eq(info.className)
    expect(element.find('i').text().trim()).to.eq(String(info.count))
    done()
  }
  )
}
)
