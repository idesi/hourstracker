import React from 'react';
import utils from './utils';

class LogItem extends React.Component {
  render() {
    return (
      <div className="log-item">
        <div className="button-primary">{utils.formattedDateTime(this.props.minutes)}</div>
        <div>{this.props.startDateTime}</div>&nbsp;-&nbsp;<div>{this.props.endDateTime}</div>
      </div>
    );
  }
}

export default LogItem;
