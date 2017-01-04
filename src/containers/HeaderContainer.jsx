// @flow
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreator.js'
import { DEFAULT_GENRE, GENRES } from '../constants/genre'
import { Link } from 'react-router'
import { browse } from '../constants/pathname'
type PropsType = {
  currentUser: ImmutablePropTypes.map,
  login: ()=>void,
  logout: ()=>void
};

class Header extends Component {
  props: Props;

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

function mapStateToProps(state: Object) {
  // console.info('state = ', state);
  return {
    currentUser: state.auth.get('user')
  }
}

Header.defaultProps = {
  genre: DEFAULT_GENRE
};

export default connect(mapStateToProps, actions)(Header)
