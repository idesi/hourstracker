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
    console.log('re-rendering');
    const isLoggedIn = this.state.user;
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-inner">
            <h1 className="App-title heading">Time Streak</h1>
            <div className="App-intro">
              <h3>An easy solution for individuals to log their daily working hours.</h3>
            </div>
          </div>
        </header>

        <div className="App-body">
          {!isLoggedIn
            ? <div>
                <SignIn />
                <div className="features">
                  <div className="feature">
                    <div className="heading">On-the-go time tracking</div>
                    <div className="feature-description">
                      Time Streak works seemlessly across all your devices allowing you to easily track your time
                      anywhere, anytime.
                    </div>
                  </div>
                  <div className="feature">
                    <div className="heading">Customizable timesheets</div>
                    <div className="feature-description">
                      Want to know how many hours you worked between two specific dates? No problem. Our flexible
                      timesheet filters give users complete control over the timesheets.
                    </div>
                  </div>
                </div>
              </div>
            : <div>
                <UserProfile />
                <Dashboard />
              </div>}
        </div>
      </div>
    );
  }
}

export default App;
