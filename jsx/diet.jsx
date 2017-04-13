import React from 'react';
import Day from './day.jsx';
import NewDayForm from './new_day_form.jsx';
import NewMealForm from './new_meal_form.jsx';

class Diet extends React.Component {

  constructor(props){
    super(props);
    this.state = {diet: props.diet};
    this.selectDay = this.selectDay.bind(this);
    this.addNewDay = this.addNewDay.bind(this);
    this.addNewMeal = this.addNewMeal.bind(this);
  }

  selectDay(date){
    $.ajax({
      url: 'api/day/' + date,
      data: {},
      method: 'GET',
      success: function(data) {
        this.setState({diet: JSON.parse(JSON.parse(data).diet)});
      }.bind(this)
    });
  }

  addNewDay(date){
    $.ajax({
      url: 'api/add_day',
      type: 'POST',
      method: 'POST',
      data: {date: date},
      success: function(data) {
        this.setState({diet: JSON.parse(JSON.parse(data).diet)});
      }.bind(this)
    });
  }

  save(e){
    e.preventDefault();
    $.ajax({
      url: 'api/save',
      data: {},
      method: 'GET',
      success: function(data) {
        console.log('saved');
      }.bind(this)
    });
  }

  addNewMeal(name, calories){
    $.ajax({
      url: 'api',
      type: 'POST',
      method: 'POST',
      data: {name: name, calories: calories, type: 'meal'},
      success: function(data) {
        this.setState({diet: JSON.parse(JSON.parse(data).diet)});
      }.bind(this)
    });
  }

  render() {
    var days = [];
    this.state.diet.days.forEach(function(day){
      if (this.state.diet.current_day == day.date) {
        days.push(<Day day={day} current={true} selectDay={this.selectDay}/>);
      }
      else {
        days.push(<Day day={day} current={false} selectDay={this.selectDay}/>);
      }
    }.bind(this));
    return (
      <div>
        <div>
          {days}
        </div>
        <div>
          <NewDayForm addNewDay={this.addNewDay}/>
        </div>
        <div>
          <NewMealForm addNewMeal={this.addNewMeal}/>
        </div>
        <button onClick={this.save}>Save diet</button>
      </div>
    );
  }
}

export default Diet;
