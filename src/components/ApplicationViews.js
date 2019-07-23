import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./login/Login";
import Register from "./register/register";
import UserHandler from "./apiManager/UserHandler";
import ArticleHandler from "./apiManager/ArticleHandler";
import EventHandler from "./apiManager/EventHandler";
import TaskHandler from "./apiManager/TaskHandler";
import MessageHandler from "./apiManager/MessageHandler";
import Events from "./events/Events";
import ArticleList from "./articles/Articles";
import ArticleForm from "./articles/ArticleForm";
import MessageList from "./messages/Messages";
import Welcome from "./welcome/welcome";

export default class ApplicationViews extends Component {
  state = {
    users: [],
    articles: [],
    events: [],
    tasks: [],
    messages: []
  };

  componentDidMount() {
    UserHandler.getAll()
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

  addArticle = article =>
    ArticleHandler.post(article)
      .then(() => ArticleHandler.getAll())
      .then(articles =>
        this.setState({
          articles: articles
        })
      );

  addUser = user =>
    UserHandler.post(user)
      .then(() => UserHandler.getAll())
      .then(users =>
        this.setState({
          users: users
        })
      );

  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  render() {
    console.log(this.state.users);
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return null;
            } else {
              return <Redirect to="/welcome" />;
            }
          }}
        />

        <Route
          exact
          path="/welcome"
          render={props => {
            return <Welcome users={this.state.users}  {...props} />;
            // Remove null and return the component which will show news articles
          }}
        />
        <Route
          path="/welcome/login"
          render={props => {
            return <Login users={this.state.users} {...props} />;
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/welcome/register"
          render={props => {
            return (
              <Register
                users={this.state.users}
                addUser={this.addUser}
                {...props}
              />
            );
          }}
        />

        <Route
          exact
          path="/articles"
          render={props => {
            if (this.isAuthenticated()){
            return <ArticleList {...props} articles={this.state.articles} />;
            }
            else {
              return <Redirect to="/welcome" />;
            }
          }}
        />

        <Route
          path="/articles/new"
          render={props => {
            return <ArticleForm {...props} addArticle={this.addArticle} />;
          }}
        />

        <Route
          path="/friends"
          render={props => {
            // Remove null and return the component which will show list of friends
            return null;
          }}
        />

        <Route
          path="/messages"
          render={props => {
            if (this.isAuthenticated()) {
              return <MessageList messages={this.state.messages} {...props} />;
            } else {
              return <Redirect to="/welcome" />;
            }

            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/events"
          render={props => {

            if (this.isAuthenticated()){
              return <Events events={this.state.events} {...props} />;
              }
              else {
                return <Redirect to="/welcome" />;
              }
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route
          path="/tasks"
          render={props => {
            if (this.isAuthenticated()){
              return null
              }
              else {
                return <Redirect to="/welcome" />;
              }
            // Remove null and return the component which will show the user's tasks
          }}
        />
      </React.Fragment>
    );
  }
}
