import React, { Component } from 'react';
import { connect } from 'react-redux';

import HttpAction from '../../redux/actions/HttpAction';
import AuthAction from '../../redux/actions/AuthAction';

import Button from '../../components/Button/Button';

import './Header.scss';

class Header extends Component {
    httpService = null;
    authService = null;

    constructor(props) {
        super(props);
        this.httpService = props.httpService;
        this.authService = props.authService;
    }



    onLogoutClick = () => {
        this.authService.logout();
        this.props.dispatch(AuthAction.logout());
    }

    render() {
        return (
            <div className="header-container" >
                <div className="brand-section">
                    <span>React Drive</span>
                </div>
                <div className="profile-section">
                    {
                        this.props.isAuthorized === true ?
                            <Button onButtonClick={this.onLogoutClick} buttonText={'Sign Out'} /> : null
                    }
                </div>
            </div>
        )
    }

}

export default connect()(Header);
