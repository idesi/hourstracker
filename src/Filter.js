import React from 'react';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFilterSaved : false,
      enteringData : false,
    }

    this.startEnteringData = this.startEnteringData.bind(this);
    this.stopEnteringData = this.stopEnteringData.bind(this);
  }

  startEnteringData(){
    this.setState({ enteringData : true });
    this.props.startEnteringData({
      creatingNewEntry : false,
      creatingFilterEntry : true
    }); //Notify the parent
  }

  stopEnteringData(){
    this.setState({ enteringData : false });
    this.props.stopEnteringData({
      creatingNewEntry : false,
      creatingFilterEntry : false
    }); //Notify the parent
  }

  get isFilterApplied() {
    return this.props.filterStartDateTime && this.props.filterEndDateTime;
  }

  render() {
    return (
      <div className="logFilters">
        <div className="heading">FILTERS</div>
        {
          this.isFilterApplied
          ? <div>
              <div>Filtering data from {this.props.filterStartDateTime} to {this.props.filterEndDateTime}</div>
              <button onClick={this.props.clearFilter}>Clear Filter</button>
            </div>
          : <div>
              <div>No filter applied currently.</div>
              <button onClick={this.startEnteringData}>Add filter</button>
            </div>
        }

      </div>
    )
  }
}
