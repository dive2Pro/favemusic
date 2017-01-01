import React, { Component } from 'react'
class Followings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoreToggled: props.isMoreToggled
    }
  }

  renderFollowings() {
    const { followings } = this.props
    if (!followings) return ""
    
    return (
      <div className='followings-content'>
        <ul>
          {followings.toJSON().map((following, idx) => {
            const {username, avatar_url, permalink_url} = following
            return (
              <li key={idx}>
                <a href={permalink_url}>
                  <img src={avatar_url}
                    alt={following.username} height='40' width='40' />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  toggleMore() {
    console.log(this.isMoreToggled)
    this.isMoreToggled = !this.isMoreToggled
    this.setState({
      isMoreToggled: this.isMoreToggled
    })

  }
  render() {
    return (
      <div>
        <h2><a href="#" onClick={() => this.toggleMore()}>
          Following people <i className={`fa ${this.isMoreToggled ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
        </a></h2>

        <div className={this.isMoreToggled ? 'more' : ''}>
          {
            this.renderFollowings()
          }
        </div>
      </div>
    )
  }
}

Followings.propsType = {
  isMoreToggled: React.PropTypes.bool
}
Followings.defaultProps = {
  isMoreToggled: false
}

export default Followings