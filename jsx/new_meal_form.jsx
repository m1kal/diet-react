import React from 'react';

class NewMealForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: '', calories: 0};
    this.change = this.change.bind(this);
    this.addNewMeal = this.addNewMeal.bind(this);
   }

  change(e) {
    var key = e.target.name;
    var value = e.target.value;
    this.setState({[key]: value});
  }

  addNewMeal(e){
    e.preventDefault();
    this.props.addNewMeal(this.state.name, this.state.calories);
  }

  render() {
    return (
    <div>
      <form onSubmit={this.addNewMeal}>
        name: <input type="text" name="name" onChange={this.change}/>
        calories: <input type="text" name="calories" onChange={this.change}/>
        <input type="submit" value="Add meal"/>
      </form>
    </div>
    );
  }
}

export default NewMealForm;
