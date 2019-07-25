import React, { Component } from "react";
import "./Login.css";


// this will give us the user object in a usable form
// let item = sessionStorage.getItem("credentials")
//         let newItem = JSON.parse(item)

export default class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // Simplistic handler for login submit
  handleLogin = event => {
    event.preventDefault();
    let temp = ""
    let findUser = this.props.users.find(user => {
      if (
        user.username === this.state.username &&
        user.password === this.state.password
      ) {
        temp = user;
      }
      return temp
    });
    if (findUser) {
      sessionStorage.setItem("userId",findUser.id)
      this.props.history.push("/")
    } else {
      alert("username or password was incorect. please enter the right password or username");
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleLogin}>
          <input
            onChange={this.handleFieldChange}
            type="username"
            id="username"
            placeholder="Username"
            className="form-control"
          />
          <input
            onChange={this.handleFieldChange}
            type="password"
            id="password"
            placeholder="Password"
            className="form-control"
          />
          <button type="submit">Sign in</button>
          <label htmlFor="Remember Me">
            <input
              id="rememberMe"
              name="rememberMe"
              value="remember"
              type="checkbox"
              onClick={() => {
                this.setState({ rememberMe: true });
              }}
            />
            Remember Me
          </label>
        </form>
      </div>
    );
  }
}
