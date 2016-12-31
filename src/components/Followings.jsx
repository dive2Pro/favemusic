import React, { Component } from 'react'
class Followings extends Component {

  render () {
    const { followings } =this.props
    return (
      <div>
        <h1>Following people</h1>
        {
          followings
          && (
            <ul>
              {followings.toJSON().map((following, idx) => {
                return (
                  <li key={idx}>
                    {following.username}
                  </li>
                )
              })}
            </ul>
          )
        }
      </div>
    )
  }
}

export default Followings