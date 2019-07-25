import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import UserHandler from "./apiManager/UserHandler";
import "./Nutshell.css";

class Nutshell extends Component {
  state = {
    userResults: [],
    emailResults: []
  }
  inputEvent = (event) => {
    const newState = {}
    // this.setState({userResults: []})
    if (event.key === "Enter") {
      let input = document.getElementById("searchBar").value
      fetch (`http://localhost:5002/users?username_like=${input}`)
      .then(r => r.json())
      .then(username => newState.userResults = username)
      .then(() => fetch (`http://localhost:5002/users?email_like=${input}`))
      .then(r => r.json())
      .then(email => newState.emailResults = email)
      .then(() => {
        this.setState(newState)
        this.props.history.push("/search")
      })

    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar inputEvent={this.inputEvent} />
        <ApplicationViews results={this.state} />
      </React.Fragment>
    );
  }
}

export default withRouter(Nutshell);
