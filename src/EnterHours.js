import React from 'react';
import InputMoment from 'input-moment';
import moment from 'moment';
import { timeEntryPush } from './firebase';
import './EnterHours.less';
import '../node_modules/input-moment/dist/input-moment.css';

class EnterHours extends React.Component {
  constructor(props) {
    super(props);

    this.onSaveClick = this.onSaveClick.bind(this);
    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      error: null,
      startDateTime: moment(),
      endDateTime: moment()
    };
  }

  async onSaveClick() {
    try {
      const minutes = this.state.endDateTime.diff(this.state.startDateTime, 'minutes');
      if (minutes <= 0) {
        throw new Error('End date time must be greater than start date time');
      }

      this.setState({ error: null });
      await timeEntryPush({
        startDateTime: this.state.startDateTime.toString(),
        endDateTime: this.state.endDateTime.toString(),
        minutes
      });

      this.setState(this.getDefaultState());
      if (this.props.callback) {
        this.props.callback();
      }
    } catch (err) {
      this.setState({ error: `Error: ${err.message}` });
    }
  }

  handleStartDateChange = startDateTime => {
    this.setState({ startDateTime });
  };

  handleEndDateChange = endDateTime => {
    this.setState({ endDateTime });
  };

  render() {
    return (
      <div>
        <form>
          <div className="input">
            You worked from {this.state.startDateTime.format('llll')} to {this.state.endDateTime.format('llll')}
          </div>
          <InputMoment
            moment={this.state.startDateTime}
            onChange={this.handleStartDateChange}
            minStep={5}
            hourStep={1}
          />
          <InputMoment moment={this.state.endDateTime} onChange={this.handleEndDateChange} minStep={5} hourStep={1} />
        </form>
        <button onClick={this.onSaveClick}>Save</button>
        <div className="error">
          {this.state.error}
        </div>
      </div>
    );
  }
}

export default EnterHours;
