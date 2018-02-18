import React from 'react';
import InputMoment from './InputMoment';
import moment from 'moment';
import { timeEntryPush } from './firebase';
import './EnterHours.css';
import '../node_modules/input-moment/dist/input-moment.css';

class EnterHours extends React.Component {
  constructor(props) {
    super(props);

    this.onSaveClick = this.onSaveClick.bind(this);
    this.onReEnterClick = this.onReEnterClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDateSave = this.handleDateSave.bind(this);

    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      error: null,
      startDateTime: moment(),
      endDateTime: moment(),
      currentlyEditing: 'startDateTime'
    };
  }

  async onSaveClick() {
    try {
      const minutes = this.state.endDateTime.diff(this.state.startDateTime, 'minutes');
      if (minutes <= 0) {
        throw new Error('End date time must be greater than start date time.');
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

  onReEnterClick() {
    this.setState(this.getDefaultState());
  }

  onCancelClick() {
    if (this.props.callback) {
      this.props.callback();
    }
  }

  handleDateChange = datetime => {
    if (!this.state.currentlyEditing) {
      return;
    }

    this.setState({ [this.state.currentlyEditing]: datetime });
  };

  handleDateSave = () => {
    const newState = this.state.currentlyEditing === 'startDateTime' ? 'endDateTime' : null;
    this.setState({ currentlyEditing: newState });
  };
  render() {
    return (
      <div>
        {this.state.currentlyEditing
          ? <div>
              <div className="text-medium">
                When did you
                <span className="emphasize-foreground-orange">
                  {this.state.currentlyEditing === 'startDateTime' ? ' start work' : ' end work'}?
                </span>
              </div>
              <form>
                <InputMoment
                  moment={this.state[this.state.currentlyEditing]}
                  onChange={this.handleDateChange}
                  minStep={5}
                  hourStep={1}
                  onSave={this.handleDateSave}
                />
              </form>
            </div>
          : <div className="App-entry-confirmation">
              <div className="text-small">
                Please verify this information is correct. <br />
                You worked from{' '}
                <span className="emphasize-foreground-orange">{this.state.startDateTime.format('llll')}</span> to{' '}
                <span className="emphasize-foreground-orange">{this.state.endDateTime.format('llll')}</span>
              </div>
              <button onClick={this.onSaveClick}>Yes, save it</button>
              <button className="button-secondary" onClick={this.onReEnterClick}>
                No, re-enter
              </button>
              <button className="button-cancel" onClick={this.onCancelClick}>
                Cancel
              </button>
            </div>}

        <div className="error">
          {this.state.error}
        </div>
      </div>
    );
  }
}

export default EnterHours;
