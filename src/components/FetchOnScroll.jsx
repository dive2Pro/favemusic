/**
 * Created by hyc on 16-12-31.
 */
import React, { Component, PropTypes } from 'react';

export default function (InnerComponent) {

  class FetchOnScrollComponent extends Component {
    constructor (props) {
      super(props)
      this.onScroll = this.onScroll.bind(this)
    }

    componentDidMount () {
        window.addEventListener('scroll', this.onScroll)

    }

    componentWillUnmount () {

      window.removeEventListener('scroll', this.onScroll)
    }

    onScroll (event) {
       if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        this.props.scrollFunc()
      }
    }

    render () {
      return (
        InnerComponent && <InnerComponent {...this.props}/>
      )
    }
  }

  FetchOnScrollComponent.propTypes = {
    scrollFunc: PropTypes.func.isRequired
  }

  return FetchOnScrollComponent
}
