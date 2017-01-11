import React from 'react'
import { connect } from 'react-redux'
import HeaderContainer from './Header'
import PlayerContainer from './Player'
import PlaylistContainer from './Playlist'

const Main = ({ children, genre }) => {
  return (
    <div>
      <HeaderContainer genre={genre} />
      {children}
      <PlaylistContainer />
      <PlayerContainer />
    </div>
  )
}
function mapStateToProps(state, ownState) {
  console.info('state', state);
  console.info('ownState', ownState);
  return {
    genre: ownState.location.query.genre
    , children: ownState.children
  }
}
export default connect(mapStateToProps)(Main)
