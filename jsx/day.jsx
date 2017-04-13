import React from 'react';

class Day extends React.Component {

  constructor(props){
    super(props);
    this.selectDay = this.selectDay.bind(this);
  }

  selectDay(e){
    e.preventDefault();
    this.props.selectDay(this.props.day.date);
  }

  render() {
    var meals = [];
    this.props.day.meals.forEach(function(meal){
      meals.push(<tr><td> {meal.name} </td><td> {meal.calories} </td></tr>);
    }.bind(this));
    var date;
    if (this.props.current) {
      date = <b> {this.props.day.date} </b>;
    }
    else {
      date = this.props.day.date;
    }
    return (
      <div>
        <div>
          <button onClick = {this.selectDay}>{date}</button>
        </div>
        <table>
          {meals}
        </table>
      </div>
    );
  }
}

export default Day;
