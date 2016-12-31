/**
 * Created by hyc on 16-12-31.
 */
import React, { Component } from 'react'

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
      console.info(window.innerHeight, '-----', document.body.offsetHeight)
      const { fetchActivities, nextHref } = this.props
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        fetchActivities(nextHref)
      }
    }

    render () {
      return (
        <InnerComponent {...this.props}/>
      )
    }
  }

  // FetchOnScrollComponent.prototype = {}

  return FetchOnScrollComponent
}