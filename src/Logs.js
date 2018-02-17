import React from 'react';
import moment from 'moment';
import { fetchLogs } from './firebase';

class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      totalMinutes: 0
    };

    this.processLogs = this.processLogs.bind(this);
    this.getTotalMinutesLogged = this.getTotalMinutesLogged.bind(this);
  }

  componentDidMount() {
    fetchLogs(null, null, this.processLogs);
  }

  getTotalMinutesLogged(m) {
    if (!m) {
      return '';
    }

    const hours = Math.floor(m / 60, 0);
    const minutes = m % 60;

    return `Total time worked ${hours}h ${minutes}m`;
  }

  processLogs(snapshot) {
    const logs = [];
    let totalMinutes = 0;
    snapshot.forEach(function(data) {
      const val = data.val();

      totalMinutes += val.minutes;

      logs.push({
        key: data.key,
        startDateTime: moment(val.startDateTime).format('dddd, MMMM Do YYYY, h:mm'),
        endDateTime: moment(val.endDateTime).format('dddd, MMMM Do YYYY, h:mm')
      });
    });

    this.setState({ logs, totalMinutes });
  }

  render() {
    const logs = this.state.logs.map(log =>
      <div key={log.key}>
        <div>
          You worked from {log.startDateTime} to {log.endDateTime}
        </div>
      </div>
    );

    return (
      <div>
        {logs}
        <div>
          {this.getTotalMinutesLogged(this.state.totalMinutes)}
        </div>
      </div>
    );
  }
}

export default Logs;
