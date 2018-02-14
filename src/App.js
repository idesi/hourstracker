import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';
import SignIn from './SignIn';
import UserProfile from './UserProfile';
import Dashboard from './Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentWillMount() {
    this.authListener = this.authListener.bind(this);
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  render() {
    const isLoggedIn = this.state.user;

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Hour tracker</h1>
        </header>
        <div className="App-body">
          {isLoggedIn
            ? <div>
                <UserProfile />
                <Dashboard />
              </div>
            : <SignIn />}
        </div>
      </div>
    );
  }
}

export default App;
