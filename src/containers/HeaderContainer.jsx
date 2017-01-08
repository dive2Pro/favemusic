// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreator.js'
import { DEFAULT_GENRE, GENRES } from '../constants/genre'
import { Link } from 'react-router'
import { browse } from '../constants/pathname'
type PropsType = {
  currentUser: Object,
  login: () => void,
  logout: () => void
};

class Header extends Component {
  props: PropsType;
  renderMenuItem: () => void;
  static defaultProps: {
    genre: string
  }

  constructor(props: PropsType) {
    super(props)
    this.renderMenuItem = this.renderMenuItem.bind(this)
  }

  renderMenuItem(genreItem: string, idx: number) {
    // const { genre } = this.props
    // const itemClassName = genre === genreItem ? "menu-item menuitem" : "menu-item"
    return (
      <Link
        key={idx} to={`/${browse}?genre=${genreItem}`} activeClassName="menu-item-selected"
        className="menu-item"
        >
        {genreItem}
      </Link>
    )
  }

  renderHeader() {
    const { currentUser, login, logout } = this.props
    const name = currentUser ? currentUser.username : 'Welcome'
    return (
      <div className="header-content">
        <div>
          <h1>Hello <Link to="/dashboard">{name}</Link></h1>
        </div>
        {GENRES.map(this.renderMenuItem)}
        <div className="header-login">
          <a href="#" onClick={currentUser ? () => logout() : () => login()}>
            <i>{currentUser ? "logout" : "login"}</i>
          </a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="header">
        {this.renderHeader()}
      </div>
    );
  }
}
Header.defaultProps = {
  genre: DEFAULT_GENRE
};

function mapStateToProps(state: Object) {
  // console.info('state = ', state);
  return {
    currentUser: state.auth.user
  }
}

export default connect(mapStateToProps, actions)(Header)
