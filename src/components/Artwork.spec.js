import Actions, { Action } from './Actions'

describe('Actions Test', () => {
  it('render, show action  ', done => {
    const configuration = [
      { x: 'x1' }, { y: 'y1' }
    ]
    const isVisible = false
    const props = {
      configuration
      , isVisible
    }

    const element = shallow(<Actions {...props} />)
    expect(element.find('.action')).to.have.length(1)
    expect(element.find('.action-visible')).to.have.length(0)
    done()
  }
  )
  it('render, show action-visible  ', done => {
    const configuration = [
      { x: 'x1' }, { y: 'y1' }
    ]
    const isVisible = true
    const props = {
      configuration
      , isVisible
    }

    const element = shallow(<Actions {...props} />)
    expect(element.find('.action')).to.have.length(1)
    expect(element.find('.action-visible')).to.have.length(1)
    done()
  }
  )
  it('render, show Action length eq   ', done => {
    const configuration = [
      { x: 'x1' }, { y: 'y1' }
    ]
    const isVisible = true
    const props = {
      configuration
      , isVisible
    }

    const element = shallow(<Actions {...props} />)
    expect(element.find('.action')).to.have.length(1)
    expect(element.find('.action-visible')).to.have.length(1)
    expect(element.find('Action')).to.have.length(configuration.length)

    done()
  }
  )
}
)
describe('Action Test', () => {
  it('render, Action   ', done => {
    const props = {
      cfg: {
        fn: () => { }
        , className: 'hyc'
      }
    }

    const element = shallow(<Action {...props} />)
    expect(element.find('.actions-item')).to.have.length(1)
    expect(element.find('i').prop('class')).to.eq(props.className)
    done()
  }
  )
}
)

