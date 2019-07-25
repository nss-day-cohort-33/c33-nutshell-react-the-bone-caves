import React, { Component } from "react";
import "./register.css";
import UserHandler from "../apiManager/UserHandler"

export default class Register extends Component {
  state = {
    username: "",
    password: "",
    email: ""
  };



  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // Simplistic handler for login submit
  handleRegister = event => {
    event.preventDefault();
    let temp = ""
    let findUser = this.props.users.find(user => {
      if (
        user.username === this.state.username ||
        user.email === this.state.email
      ) {
        temp = user;
      }
      return temp
    });
    if (findUser) {
      console.log("if ",findUser)
      alert(
        "username or email already in use."
      );

    } else {
      let stateUser = this.state
      this.props.addUser(stateUser)
      .then(() => UserHandler.getAll())
      .then(users => {
        users.forEach(user => {
          if(user.username === stateUser.username && user.email === stateUser.email ){
            sessionStorage.setItem("userId", user.id)
          }
        })
        this.props.history.push("/");
      })


    }
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleRegister}>
          <input
            onChange={this.handleFieldChange}
            type="text"
            placeholder="Username"
            id="username"
            className="form-control"
          />
          <input
            onChange={this.handleFieldChange}
            type="text"
            placeholder="Email"
            id="email"
            className="form-control"
          />
          <input
            onChange={this.handleFieldChange}
            type="text"
            placeholder="Password"
            id="password"
            className="form-control"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
