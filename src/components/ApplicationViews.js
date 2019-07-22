import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./login/Login"
import Register from './register/register'

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <Login />
            // Remove null and return the component which will show news articles
          }}
        />

        <Route path="/register" render={props => {
            return <Register />
          }}
        />
        
        <Route
          path="/friends" render={props => {
            // Remove null and return the component which will show list of friends
            return null
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/events" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />


      </React.Fragment>
    );
  }
}
