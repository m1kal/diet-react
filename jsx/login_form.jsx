import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username:'', password:''};
    this.login = this.login.bind(this);
    this.change = this.change.bind(this);
    this.loginSuccess = props.loginSuccess;
  }

  login(e) {
    e.preventDefault();
    $.ajax({
      url: 'api/login',
      type: 'POST',
      method: 'POST',
      data: {user: this.state.username, password: this.state.password},
      success: this.loginSuccess
    });
  }

  change(e) {
    var key = e.target.name;
    var value = e.target.value;
    this.setState({[key]: value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          name: <input type="text" name="username" onChange={this.change}/><br/>
          password: <input type="text" name="password" onChange={this.change}/><br/>
          <input type="submit" value="login"/>
        </form>
      </div>);
  }
}

export default LoginForm;
