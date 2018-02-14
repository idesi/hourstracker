import React from 'react';
import firebase, { auth, googleAuthProvider } from './firebase';

class SignIn extends React.Component {
  componentWillMount() {
    this.signIn = this.signIn.bind(this);
  }

  async signIn() {
    await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    return auth.signInWithPopup(googleAuthProvider);
  }

  render() {
    return (
      <div className="signIn">
        <button onClick={this.signIn}>Sign Up or Sign In</button>
      </div>
    );
  }
}

export default SignIn;
