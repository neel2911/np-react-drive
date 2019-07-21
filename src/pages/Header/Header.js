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

    onLoginClick = () => {
        this.authService.login(this.loginSuccessCB);
    }

    loginSuccessCB = (isLogin) => {
        console.log(isLogin);
        if (isLogin) {
            this.props.dispatch(AuthAction.login(isLogin))
            this.props.dispatch(HttpAction.get(this.httpService.get('root')));
        }
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
                            <Button onButtonClick={this.onLogoutClick} buttonText={'Sign Out'} /> :
                            <Button onButtonClick={this.onLoginClick} buttonText={'Sign in with Google'} />
                    }
                </div>
            </div>
        )
    }

}

export default connect()(Header);
