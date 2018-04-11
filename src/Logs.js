import React from 'react';
import moment from 'moment';
import { fetchLogs } from './firebase';
import LogItem from './LogItem';
import utils from './utils';
import Filter from './Filter';

const dateTimeFormat = 'dddd, MMMM Do YYYY, h:mm a';

class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      totalMinutes: 0,
    };

    this.processLogs = this.processLogs.bind(this);
  }

  componentDidMount() {
    fetchLogs(null, null, this.processLogs);
  }

  componentWillReceiveProps(nextProps) {
    //If filter props have changed, then reprocess the logs so that we show the appropriate logs on screen
    if (this.props.filterStartDateTime !== nextProps.filterStartDateTime || this.props.filterEndDateTime !== nextProps.filterEndDateTime) {
        fetchLogs(null, null, this.processLogs);
    }
  }

  processLogs(snapshot) {
    const logs = [];
    let totalMinutes = 0;
    const filterStartDateTime = this.props.filterStartDateTime;
    const filterEndDateTime = this.props.filterEndDateTime;

    snapshot.forEach(function(data) {
      const val = data.val();
      const startDateTimeMoment = moment(val.startDateTime);
      const endDateTimeMoment = moment(val.endDateTime);

      let includeLog = true;
      //Ensure that this log entry meets the filter criteria
      if (filterStartDateTime && filterEndDateTime) {
        includeLog =
          startDateTimeMoment.isSameOrAfter(filterStartDateTime)
          && endDateTimeMoment.isSameOrBefore(filterEndDateTime);
      }

      if (includeLog) {
        totalMinutes += val.minutes;

        logs.push({
          id: data.key,
          startDateTime: startDateTimeMoment.format(dateTimeFormat),
          endDateTime: endDateTimeMoment.format(dateTimeFormat),
          minutes: val.minutes
        });
      }
    });

    this.setState({ logs, totalMinutes });
  }

  renderTotalMinutes() {
    const { hours, minutes } = utils.minutesToHoursAndMinutes(this.state.totalMinutes);
    return `Total time worked: ${hours}hrs ${minutes ? minutes + 'minutes' : ''}`;
  }

  render() {
    // Show the newest logs first
    const logs = this.state.logs.sort((a, b) => {
      const aStartDateTime = moment(a.startDateTime, dateTimeFormat);
      const bStartDateTime = moment(b.startDateTime, dateTimeFormat);
      return bStartDateTime.isAfter(aStartDateTime);
    }).map(log => <LogItem key={log.id} {...log} />);

    return (
      <div>
        <div className="heading">Timesheet</div>
        { <Filter
          startEnteringData={this.props.startEnteringData}
          stopEnteringData={this.props.stopEnteringData}
          filterStartDateTime={this.props.filterStartDateTime ? this.props.filterStartDateTime.format(dateTimeFormat) : null}
          filterEndDateTime={this.props.filterEndDateTime ? this.props.filterEndDateTime.format(dateTimeFormat) : null}
          clearFilter={this.props.clearFilter}
        /> }
        { this.state.logs.length === 0
          ?
            <div className="text-large text-gray">
              No timesheet entry found. <br />Click the "Enter time" button to start logging your hours.
            </div>
          :
          <div>
            <div className="log-items">
              {logs}
            </div>
            <div className="text-medium">
              Total time worked: {utils.formattedDateTime(this.state.totalMinutes)}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Logs;
