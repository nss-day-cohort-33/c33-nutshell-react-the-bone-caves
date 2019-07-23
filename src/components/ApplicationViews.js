import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./login/Login"
import Register from './register/register'
import UserHandler from "./apiManager/UserHandler"
import ArticleHandler from "./apiManager/ArticleHandler"
import EventHandler from "./apiManager/EventHandler"
import TaskHandler from "./apiManager/TaskHandler"
import MessageHandler from "./apiManager/MessageHandler"
import Task from "./tasks/Task"

export default class ApplicationViews extends Component {
  state = {
    users: [],
    articles: [],
    events: [],
    tasks: [],
    messages: []
  };

  componentDidMount() {
    UserHandler
      .getAll()
      .then(users => this.setState({ users: users }))
      .then(() => ArticleHandler.getAll())
      .then(articles => this.setState({ articles: articles }))
      .then(() => EventHandler.getAll())
      .then(events => this.setState({ events: events }))
      .then(() => TaskHandler.getAll())
      .then(tasks => this.setState({ tasks: tasks }))
      .then(() => MessageHandler.getAll())
      .then(messages => this.setState({ messages: messages }));
  }


        // put functions
        updateTask = task => taskHandler.put(task)
                .then(() => taskHandler.getAll())
                .then(tasks=> {
                        this.setState({
                                task: tasks
                        })
                })


  render() {
    console.log(this.state)
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
          path="/tasks" render={props => {
            return <Task {...props} tasks={this.state.tasks} updateTask={this.updateTask}/>
            // Remove null and return the component which will show the user's tasks
          }}
        />


      </React.Fragment>
    );
  }
}
