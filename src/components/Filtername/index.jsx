import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {filterByName} from '../../actions/actionCreator'
// todo import debounce from 'lodash/debounce'
import classnames from 'classnames'

class Filtername extends React.Component {

  onInputChange = () => {
    const value = this.input.value
    const { filterFunc } = this.props
    filterFunc(value)
  }

  render() {
    const { filterName } = this.props
    const filterClass = classnames(
      "stream-interaction-icon"
      , {
        "stream-interaction-icon-active": filterName !== '' && filterName != null
      }
    )
    return (
      <div className="stream-interaction">
        <div className={filterClass}>
          <i className="fa fa-search" />
        </div>
        <div className="stream-interaction-content">
          <input
            className="input-menu"
            onChange={this.onInputChange}
            type="text"
            ref={(inp) => { this.input = inp }}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    filterName: state.filter.filterName
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    filterFunc: bindActionCreators(filterByName, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Filtername)
