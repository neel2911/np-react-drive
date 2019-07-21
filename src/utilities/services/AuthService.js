import gapi from 'gapi-client';

class AuthService {
    googleAuth = null;
    setAuthInstance = () => {
        this.googleAuth = gapi.auth2.getAuthInstance();
    }
    checkLogin = () => {
        if (this.googleAuth) {
            return this.googleAuth.isSignedIn.get();
        }
        return false;
    }

    login = (loginSuccessCB) => {
        this.googleAuth.isSignedIn.listen(() => loginSuccessCB(this.googleAuth.isSignedIn.get()))
        this.googleAuth.signIn();
    }

    logout = () => {
        this.googleAuth.signOut();
        this.googleAuth.disconnect();
    }


}

export default AuthService;

