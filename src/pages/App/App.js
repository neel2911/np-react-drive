import React, { Component } from 'react';
import { connect } from 'react-redux';

import HttpService from '../../utilities/services/HttpService';
import AuthService from '../../utilities/services/AuthService';
import HttpAction from '../../redux/actions/HttpAction';

import Header from '../Header/Header';
import AuthAction from '../../redux/actions/AuthAction';

import LeftPanel from '../LeftPanel/LeftPanel';
import Main from '../Main/Main';
import Button from '../../components/Button/Button';

import './App.scss';
class App extends Component {
  httpService = null;
  authService = null;

  state = {
    isapiloaded: false
  }

  constructor(props) {
    super(props);
    this.httpService = new HttpService();
    this.authService = new AuthService();
  }

  componentWillMount() {
    this.httpService.init(this.gapiLoadSuccess);
  }

  gapiLoadSuccess = () => {
    this.setState({ isapiloaded: true });
    this.authService.setAuthInstance();
    this.props.dispatch(AuthAction.login(this.authService.checkLogin()))
    if (this.props.authReducer.isAuthorized) {
      this.props.dispatch(HttpAction.get(this.httpService.get('root')));
    }
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

  render() {

    const bodyData = (
      <React.Fragment>
        <Header isAuthorized={this.props.authReducer.isAuthorized} httpService={this.httpService} authService={this.authService} />
        {this.props.authReducer.isAuthorized === true ? (
          <React.Fragment>
            <LeftPanel httpService={this.httpService} authService={this.authService} />
            <Main files={this.props.httpReducer.files} httpService={this.httpService} authService={this.authService} />
          </React.Fragment>
        ) : <div className="auth-container">
            <Button onButtonClick={this.onLoginClick} buttonText={'Sign in with Google'} />
          </div>}
      </React.Fragment>
    )
    return (
      <React.Fragment>
        {
          this.state.isapiloaded === true ? bodyData : 'Loading...'
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    httpReducer: state.httpReducer,
    authReducer: state.authReducer
  }
}

export default connect(mapStateToProps)(App);

