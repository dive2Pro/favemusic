import LoadingSpinner from './index'
describe('LoadingSpinner Test', () => {
  it('render when isLoading', done => {
    const props = {
      isLoading: true
    }

    const element = shallow(<LoadingSpinner {...props} />)
    expect(element.find('.loading-spinner')).to.have.length(1)
    done()
  }
  )
  it('render when is not loading', done => {
    const props = {
      isLoading: false
    }

    const element = shallow(<LoadingSpinner {...props} />)
    expect(element.find('.loading-spinner')).to.have.length(0)
    done()
  }
  )
}
)
