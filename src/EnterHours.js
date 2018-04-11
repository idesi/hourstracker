import React from 'react';
import InputMoment from './InputMoment';
import moment from 'moment';
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

  onReEnterClick() {
    this.setState(this.getDefaultState());
  }

  onCancelClick() {
    if (this.props.onSaveCallback) {
      this.props.onSaveCallback();
    }
  }

  handleDateChange = datetime => {
    if (!this.state.currentlyEditing) {
      return;
    }

    this.setState({ [this.state.currentlyEditing]: datetime });
  };

  handleDateSave = () => {
    const wasEditingStartDateTime = this.state.currentlyEditing === 'startDateTime';
    const newState = {};

    //If the user just finished entering the start date time then transition to
    //end date time editing & set end date to be the same as start date
    if (wasEditingStartDateTime) {
      newState.currentlyEditing = 'endDateTime';
      newState.endDateTime = new moment(this.state.startDateTime);
    } else {
      newState.currentlyEditing = null;
    }

    this.setState(newState);
  };

  async onSaveClick() {
    try {
      const minutes = this.state.endDateTime.diff(this.state.startDateTime, 'minutes');
      if (minutes <= 0) {
        throw new Error('End date time must be greater than start date time.');
      }

      this.setState({ error: null });

      await this.props.onSaveClick({
        startDateTime : this.state.startDateTime,
        endDateTime   : this.state.endDateTime,
        minutes       : minutes,
      });

      this.setState(this.getDefaultState());

      if (this.props.onSaveCallback) {
        this.props.onSaveCallback();
      }
    } catch (err) {
      this.setState({ error: `Error: ${err.message}` });
    }
  }

  render() {
    return (
      <div>
        {this.state.currentlyEditing
          ? <div>
              {this.props.creatingFilterEntry
              ?
              <div className="text-medium">
                Filter logs
                <span className="emphasize-foreground-orange">
                  {this.state.currentlyEditing === 'startDateTime' ? ' starting from' : ' ending on'}?
                </span>
              </div>
              :<div className="text-medium">
                When did you
                <span className="emphasize-foreground-orange">
                  {this.state.currentlyEditing === 'startDateTime' ? ' start work' : ' end work'}?
                </span>
              </div>}
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
                { this.props.creatingFilterEntry ? 'Filter logs from ' : 'You worked from ' }
                <span className="emphasize-foreground-orange">{this.state.startDateTime.format('llll')}</span> to{' '}
                <span className="emphasize-foreground-orange">{this.state.endDateTime.format('llll')}</span>
              </div>
              <button onClick={() => this.onSaveClick()}>Yes, save it</button>
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
