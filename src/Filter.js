import React from 'react';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      starteDate : null,
      endDate    : null,
      isFilterSaved : false,
      showErrorMessage : false,
    }

    this.onApplyFilterClick = this.onApplyFilterClick.bind(this);
  }

  get isFilterApplied() {
    return this.state.startDate && this.state.endDate;
  }

  onApplyFilterClick(){
    const showErrorMessage = !this.isFilterApplied
    this.setState({ showErrorMessage });
  }

  render() {
    return (
      <div className="logFilters">
        <div className="heading">FILTERS</div>
        {
          this.state.isFilterSaved ?
          'Filter has been applied' :
          <div>
            <div className="italic">No filter applied</div>
            <div className="date-pickers">
              <div>
                <label>Start Date</label>
                <input type="date" className="fltStartDate" onChange={console.log('test')}/>
              </div>
              <div>
                <label>End Date</label>
                <input type="date" className="fltEndDate"/>
              </div>
              <button onClick={this.onApplyFilterClick}>Apply</button>
            </div>
            <div className={ `errorMessage ${this.state.showErrorMessage ? '' : 'hide' }` }>
              Please enter a start and end date.
            </div>
          </div>
        }
      </div>
    )
  }
}
