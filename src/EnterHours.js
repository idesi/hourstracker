import React from 'react';
import { timeEntryPush } from './firebase';

class EnterHours extends React.Component {
  constructor(props) {
    super(props);

    this.onSaveClick = this.onSaveClick.bind(this);

    this.state = {
      error: null
    };
  }

  async onSaveClick() {
    try {
      if (!this.textInput) {
        return;
      }

      let value = this.textInput.value.trim();
      if (!value) {
        throw new Error('Please enter a value');
        return;
      }

      //convert to int
      value = +value;

      if (value > 24) {
        throw new Error('Cannot enter a valye grater than 24');
      }

      this.setState({ error: null });

      const obj = {
        hours: value
      };

      await timeEntryPush(obj);
      this.textInput.value = '';
    } catch (err) {
      this.setState({ error: `Error: ${err.message}` });
    }
  }

  render() {
    return (
      <div>
        <input
          type="number"
          className="txt-large"
          placeholder="How many hours did you work today?"
          ref={input => {
            this.textInput = input;
          }}
        />
        <button onClick={this.onSaveClick}>Save</button>
        <div className="error">
          {this.state.error}
        </div>
      </div>
    );
  }
}

export default EnterHours;
