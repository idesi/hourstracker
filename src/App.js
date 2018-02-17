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
    if (!isLoggedIn) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Time Streak</h1>
            <div className="App-intro">
              <h3>An easy solution for individuals to log their daily working hours.</h3>
            </div>
          </header>
          <div className="App-body">
            <SignIn />

            <div className="features">
              <div className="feature">
                <h3>On-the-go time tracking</h3>
                <div className="feature-description">
                  Time Streak works seemlessly across all your devices allowing you to easily track your time anywhere,
                  anytime.
                </div>
              </div>
              <div className="feature">
                <h3>Customizable timesheets</h3>
                <div className="feature-description">
                  Want to know how many hours you worked between two specific dates? No problem. Our flexible timesheet
                  filters give users complete control over the timesheets.
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="App-body">
            <UserProfile />
            <Dashboard />
          </div>
        </div>
      );
    }
  }
}

export default App;
