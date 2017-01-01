import React, {Component} from 'react';

class Header extends Component {
    renderHeader() {
        const {currentUser} = this.props
        return (
            <div>
                <h1>Hello {currentUser.username}</h1>
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