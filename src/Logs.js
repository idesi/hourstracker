import React from 'react';
import moment from 'moment';
import { fetchLogs } from './firebase';
import LogItem from './LogItem';
import utils from './utils';

class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      totalMinutes: 0
    };

    this.processLogs = this.processLogs.bind(this);
  }

  componentDidMount() {
    fetchLogs(null, null, this.processLogs);
  }

  processLogs(snapshot) {
    const logs = [];
    let totalMinutes = 0;
    snapshot.forEach(function(data) {
      const val = data.val();

      totalMinutes += val.minutes;

      logs.push({
        key: data.key,
        startDateTime: moment(val.startDateTime).format('dddd, MMMM Do YYYY, h:mm a'),
        endDateTime: moment(val.endDateTime).format('dddd, MMMM Do YYYY, h:mm a'),
        minutes: val.minutes
      });
    });

    this.setState({ logs, totalMinutes });
  }

  renderTotalMinutes() {
    const { hours, minutes } = utils.minutesToHoursAndMinutes(this.state.totalMinutes);
    return `Total time worked: ${hours}hrs ${minutes ? minutes + 'minutes' : ''}`;
  }

  render() {
    if (this.state.logs.length === 0) {
      return (
        <div className="text-large text-gray">
          No timesheet entry found. <br />Click the "Enter time" button to start logging your hours.
        </div>
      );
    }

    const logs = this.state.logs.map(log => <LogItem key={log.key} {...log} />);

    return (
      <div>
        <div className="heading">Timesheet</div>
        <div className="log-items">
          {logs}
        </div>
        <div className="text-medium">
          Total time worked: {utils.formattedDateTime(this.state.totalMinutes)}
        </div>
      </div>
    );
  }
}

export default Logs;
