// eslint-disable-next-line
import React from 'react';
import InputMoment from 'input-moment';

export default class InputMomentLocal extends InputMoment {
  handleSave = e => {
    e.preventDefault();
    if (this.props.onSave) this.props.onSave();
    this.setState({ tab: 0 });
  };
}
