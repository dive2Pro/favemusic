// @flow

import React, { Component } from 'react';
type FetchPropsType = {
  scrollFunc: () => void
};

export default function (InnerComponent: HTMLElement): Class<FetchOnScrollComponent> {
  class FetchOnScrollComponent extends Component {
    constructor(props: FetchPropsType) {
      super(props)
      this.onScroll = this.onScroll.bind(this)
    }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll)
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll)
    }

    onScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        this.props.scrollFunc()
      }
    }

    render(): ?React$Element {
      return (
        InnerComponent && <InnerComponent {...this.props} />
      )
    }
  }


  return FetchOnScrollComponent
}
