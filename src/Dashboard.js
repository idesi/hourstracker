import React from 'react';
import EnterHours from './EnterHours';
import Logs from './Logs';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteringData: false
    };
  }

  render() {
    if (this.state.enteringData) {
      return <EnterHours callback={() => this.setState({ enteringData: false })} />;
    } else {
      return (
        <div>
          <button onClick={() => this.setState({ enteringData: true })}>Enter time</button>
          <Logs />
        </div>
      );
    }
  }
}

export default Dashboard;
