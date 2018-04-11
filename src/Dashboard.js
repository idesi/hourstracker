import React from 'react';
import EnterHours from './EnterHours';
import Logs from './Logs';
import { timeEntryPush } from './firebase';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enteringData : false,
      creatingNewEntry : false,
      creatingFilterEntry : false,
      filterStartDateTime : null,
      filterEndDateTime : null,
    };

    this.startEnteringData = this.startEnteringData.bind(this);
    this.stopEnteringData = this.stopEnteringData.bind(this);
    this.onEnterHoursSaveClick = this.onEnterHoursSaveClick.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  startEnteringData(options){
    options = options || {
      creatingNewEntry : true,
      creatingFilterEntry : false
    };

    options.enteringData = true;
    this.setState(options);
  }

  stopEnteringData(options){
    options = options || {
      creatingNewEntry : false,
      creatingFilterEntry : false
    };

    options.enteringData = false;

    this.setState(options);
  }

  async onEnterHoursSaveClick(){
    const fn = this.state.creatingNewEntry ? this.onNewLogSaveClick : this.onFilterSaveClick;
    await fn.apply(this, arguments);
  }

  async onNewLogSaveClick(entry) {
    try {
      await timeEntryPush({
        startDateTime : entry.startDateTime.toString(),
        endDateTime   : entry.endDateTime.toString(),
        minutes       : entry.minutes,
      });
    } catch (err) {
      this.setState({ error: `Error: ${err.message}` });
    }
  }

  onFilterSaveClick(entry) {
    this.setState({
      filterStartDateTime : entry.startDateTime,
      filterEndDateTime : entry.endDateTime,
    })
  }

  clearFilter(){
    this.setState({
      filterStartDateTime : null,
      filterEndDateTime : null,
    });
  }

  render() {
    if (this.state.enteringData) {
      return <EnterHours
        onSaveCallback={this.stopEnteringData}
        onSaveClick={this.onEnterHoursSaveClick}
        {...this.state}
      />;
    } else {
      return (
        <div>
          <button onClick={()=> this.startEnteringData(null)}>Enter time</button>
          <Logs
            startEnteringData={this.startEnteringData}
            stopEnteringData={this.stopEnteringData}
            filterStartDateTime={this.state.filterStartDateTime}
            filterEndDateTime={this.state.filterEndDateTime}
            clearFilter={this.clearFilter}
          />
        </div>
      );
    }
  }
}

export default Dashboard;
