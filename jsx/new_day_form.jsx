import React from 'react';

class NewDayForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date().toJSON().slice(0,10)};
    this.change = this.change.bind(this);
    this.addNewDay = this.addNewDay.bind(this);
   }

  change(e) {
    var key = e.target.name;
    var value = e.target.value;
    this.setState({[key]: value});
  }

  addNewDay(e){
    e.preventDefault();
    this.props.addNewDay(this.state.date);
  }

  render() {
    return (
    <div>
      <form onSubmit={this.addNewDay}>
        date: <input type="text" name="date" value={this.state.date} onChange={this.change}/>
        <input type="submit" value="Add day"/>
      </form>
    </div>
    );
  }
}

export default NewDayForm;
