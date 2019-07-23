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
import ArticleList from './articles/Articles'
import ArticleForm from './articles/ArticleForm'
import MessageList from "./messages/Messages"
import TaskForm from "./tasks/TaskForm"
import TaskEditForm from "./tasks/TaskEditForm"

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

  deleteTask = id => {
    TaskHandler.delete(id)
      .then(() => TaskHandler.getAll())
      .then(tasks => {

        this.setState({ tasks: tasks })
      })
  }


  // put functions
  updateTask = task => TaskHandler.put(task)
    .then(() => TaskHandler.getAll())
    .then(tasks => {
      this.setState({
        task: tasks
      })
    })

  addArticle = article =>
    ArticleHandler.post(article)
      .then(() => ArticleHandler.getAll())
      .then(articles =>
        this.setState({
          articles: articles
        })
      );

  addTask = task =>
    TaskHandler.post(task)
      .then(() => TaskHandler.getAll())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      );


  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/login" render={props => {
            return <Login />
            // Remove null and return the component which will show news articles
          }}
        />

        <Route path="/register" render={props => {
          return <Register />
        }}
        />

        <Route exact path="/articles" render={props => {
          return <ArticleList {...props}
            articles={this.state.articles}
          />
        }}
        />

        <Route path="/articles/new" render={(props) => {
          return <ArticleForm {...props}
            addArticle={this.addArticle} />
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
            return <MessageList messages={this.state.messages} {...props} />
            // Remove null and return the component which will show the messages
          }}
        />

        <Route exact
          path="/tasks/new" render={props => {
            return <TaskForm {...props} addTask={this.addTask} />
            // Remove null and return the component which will show the user's tasks
          }}
        />
        <Route exact
          path="/tasks/:id(\d+)/edit" render={props => {
            return <TaskEditForm {...props} updateTask={this.updateTask} tasks={this.tasks} />
          }}
          />
        <Route exact
          path="/tasks" render={props => {
          return <Task {...props} tasks={this.state.tasks} updateTask={this.updateTask} deleteTask={this.deleteTask} />
          // Remove null and return the component which will show the user's tasks
        }}
        />


      </React.Fragment>
    );
  }
}
