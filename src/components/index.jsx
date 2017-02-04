import React from 'react'
import { connect } from 'react-redux'
import HeaderContainer from './Header/index'
import PlayerContainer from './Player/index'
import PlaylistContainer from './Playlist/index'
import Volume from './Volume/index'
const Main = ({ children, genre }) => {
  return (
    <div>
      <HeaderContainer genre={genre} />
      {children}
      <PlaylistContainer />
      <PlayerContainer />
      <Volume />
    </div>
  )
}

function mapStateToProps(state, ownState) {
  return {
    genre: ownState.location.query.genre
    , children: ownState.children
  }
}
export default connect(mapStateToProps)(Main)
