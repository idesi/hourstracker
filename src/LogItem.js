import React from 'react';
import utils from './utils';

class LogItem extends React.Component {
  render() {
    return (
      <div key={this.props.key} className="log-item">
        <span className="button-primary">{utils.formattedDateTime(this.props.minutes)}</span>
        {this.props.startDateTime} - {this.props.endDateTime}
      </div>
    );
  }
}

export default LogItem;
