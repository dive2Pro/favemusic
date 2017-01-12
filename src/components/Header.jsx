// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreator.js'
import { DEFAULT_GENRE, GENRES } from '../constants/genre'
import { Link } from 'react-router'
// import { browse } from '../constants/pathname'
import { bindActionCreators } from 'redux'
import map from 'lodash/map'
type PropsType = {
  currentUser: Object,
  login: () => void,
  logout: () => void
};
const MenuItem = ({ genreItem, pathname }: {}) => (
  <li>
    <Link
      to={`${pathname}?genre=${genreItem}`} activeClassName="menu-item-selected"
      className="menu-item"
      >
      {genreItem}
    </Link>
  </li>
)
const renderHeader = ({ ...props }: PropsType) => {
  const { currentUser, login, logout, pathname } = props
  const name = currentUser ? currentUser.username : 'Welcome'
  return (
    <div className="header-content">
      <div>
        <h1>Hello <Link to={!currentUser ? "/dashboard" : "/browse"}>{name}</Link></h1>
      </div>
      <ul>
        {map(GENRES, (gereItem: string, idx: number) => (
          <MenuItem key={idx} genreItem={gereItem} pathname={pathname} />
        ))}
      </ul>
      <div className="header-login">
        <a href="#" onClick={currentUser ? () => logout() : () => login()}>
          <i>{currentUser ? "logout" : "login"}</i>
        </a>
      </div>
    </div>
  )
}
const Header = ({ ...props }: PropsType) => {
  return (
    <div className="header">
      {renderHeader({ ...props })}
    </div>
  );
}
Header.defaultProps = {
  genre: DEFAULT_GENRE
};

function mapStateToProps(state: Object, ownState: {}) {
  console.info('state = ', state);
  console.info('ownState = ', ownState);
  return {
    currentUser: state.auth.user
    , genre: ownState.genre
    , pathname: window.location.pathname
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
    login: bindActionCreators(actions.login, dispatch)
    , logout: bindActionCreators(actions.logout, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
