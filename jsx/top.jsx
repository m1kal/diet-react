import React from 'react';
import LoginForm from './login_form.jsx'
import Diet from './diet.jsx'

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null, diet: null};
    this.loginSuccess = this.loginSuccess.bind(this);
  }

  loginSuccess(data) {
    var parsed_data = JSON.parse(data);
    this.setState({user: parsed_data.user,
                   diet: JSON.parse(parsed_data.diet)
    });
  }

  render() {
    if ((this.state.user) && (this.state.user != '')) {
      return (
       <div>
         <Diet diet={this.state.diet}/>
       </div>
      );
    }
    else {
      return (
        <LoginForm loginSuccess={this.loginSuccess} />
      );
    }
  }
}

export default Top;
