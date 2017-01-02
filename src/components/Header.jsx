import React, { Component } from 'react';

class Header extends Component {
    renderHeader() {
        const {currentUser, login, logout} = this.props
        const name=currentUser?currentUser.username:'Welcome'
        return (
            <div className='header-content'>
                <h1>Hello {name}</h1>
                <div className="header-login">
                    <a href='#' onClick={currentUser ? () => logout() : () => login()}>
                        <i>{currentUser ? "logout" : "login"}</i>
                    </a>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className='header'>
                {this.renderHeader()}
            </div>
        );
    }
}

export default Header;