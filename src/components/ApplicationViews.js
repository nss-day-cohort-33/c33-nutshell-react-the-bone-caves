import { Route, withRouter, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from "./login/Login";
import Register from "./register/register";
import FriendHandler from "./apiManager/FriendHandler";
import UserHandler from "./apiManager/UserHandler";
import ArticleHandler from "./apiManager/ArticleHandler";
import EventHandler from "./apiManager/EventHandler";
import TaskHandler from "./apiManager/TaskHandler";
import MessageHandler from "./apiManager/MessageHandler";
import Task from "./tasks/Task";
import Events from "./events/Events";
import EventForm from "./events/EventForm";
import EditEventForm from "./events/EditEventForm";
import ArticleList from "./articles/Articles";
import ArticleForm from "./articles/ArticleForm";
import ArticleEditForm from "./articles/ArticleEditForm";
import MessageList from "./messages/Messages";
import TaskForm from "./tasks/TaskForm";
import TaskEditForm from "./tasks/TaskEditForm";
import Welcome from "./welcome/welcome";

class ApplicationViews extends Component {
  state = {
    users: [],
    articles: [],
    events: [],
    tasks: [],
    messages: [],
    friends: []
  };

  componentDidMount() {
    UserHandler.getAll()
      .then(users => this.setState({ users: users }))
      .then(() => FriendHandler.getAll())
      .then(friends => {
        let sortFriends = this.sortFriend(friends);
        this.setState({ friends: sortFriends });
      })
      .then(() => ArticleHandler.getAll())
      .then(articles => {
        let sortArticles = this.sortArticle(articles);
        this.setState({ articles: sortArticles });
      })
      .then(() => EventHandler.get("?_expand=user"))
      .then(events => {
        let sortEvents = this.sortEvent(events);
        this.setState({ events: sortEvents });
      })
      .then(() => TaskHandler.getAll())
      .then(tasks => this.setState({ tasks: tasks }))
      .then(() => MessageHandler.getAll())
      .then(messages => this.setState({ messages: messages }));
  }

  deleteTask = id => {
    TaskHandler.delete(id)
      .then(() => TaskHandler.getAll())
      .then(tasks => {
        this.setState({ tasks: tasks });
      });
  };

  sortFriend = arr => {
    let id = +sessionStorage.getItem("userId");
    let friendArr = arr.filter(friend => {
      if (friend.userId_1 === id || friend.userId_2 === id) {
        return friend;
      }
    });
    return friendArr;
  };

  // put functions
  updateTask = task =>
    TaskHandler.put(task)
      .then(() => TaskHandler.getAll())
      .then(tasks => {
        this.setState({
          tasks: tasks
        });
      });
  sortArticle = arr => {
    return arr.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  };

  sortEvent = arr => {
    return arr.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  };

  addArticle = article =>
    ArticleHandler.post(article)
      .then(() => ArticleHandler.getAll())
      .then(articles => {
        let sortArticles = this.sortArticle(articles);
        this.setState({
          articles: sortArticles
        });
      });

  addTask = task =>
    TaskHandler.post(task)
      .then(() => TaskHandler.getAll())
      .then(tasks =>
        this.setState({
          tasks: tasks
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

  addEvent = event => {
    EventHandler.post(event)
      .then(() => EventHandler.get("?_expand=user"))
      .then(events => {
        let sortEvents = this.sortEvent(events);
        this.setState({ events: sortEvents });
        this.props.history.push("/events");
      });
  };

  deleteEvent = id => {
    EventHandler.delete(id)
      .then(() => EventHandler.get("?_expand=user"))
      .then(events => {
        let sortEvents = this.sortEvent(events);
        this.setState({ events: sortEvents });
        this.props.history.goBack();
      });
  };

  updateEvent = editEvent => {
    EventHandler.put(editEvent)
      .then(() => EventHandler.get("?_expand=user"))
      .then(events => {
        let sortEvents = this.sortEvent(events);
        this.setState({ events: sortEvents });
        this.props.history.goBack();
      });
  };

  updateArticle = article => {
    return ArticleHandler.put(article)
      .then(() => ArticleHandler.getAll())
      .then(articles => {
        let sortArticles = this.sortArticle(articles);
        this.setState({
          articles: sortArticles
        });
      });
  };

  deleteArticle = id =>
    ArticleHandler.delete(id)
      .then(() => ArticleHandler.getAll())
      .then(articles => {
        let sortArticles = this.sortArticle(articles);
        this.setState({
          articles: sortArticles
        });
        this.props.history.push("/articles");
      });

  isAuthenticated = () => sessionStorage.getItem("userId") !== null;

  render() {
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
            return <Welcome users={this.state.users} {...props} />;
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
          path="/register"
          render={props => {
            return <Register />;
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
            if (this.isAuthenticated()) {
              return (
                <ArticleList
                  {...props}
                  articles={this.state.articles}
                  deleteArticle={this.deleteArticle}
                />
              );
            } else {
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
          path="/articles/:articlesId(\d+)/edit"
          render={props => {
            return (
              <ArticleEditForm
                {...props}
                articles={this.state.articles}
                updateArticle={this.updateArticle}
              />
            );
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
          exact
          path="/tasks/new"
          render={props => {
            return <TaskForm {...props} addTask={this.addTask} />;
          }}
        />
        <Route
          exact
          path="/events"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Events
                  events={this.state.events}
                  sortEvents={this.sortEvents}
                  {...props}
                  deleteEvent={this.deleteEvent}
                  updateEvent={this.updateEvent}
                  friends={this.state.friends}
                />
              );
            } else {
              return <Redirect to="/welcome" />;
            }
            // Remove null and return the component which will show the user's tasks
          }}
        />
        <Route
          exact
          path="/tasks/:id(\d+)/edit"
          render={props => {
            return (
              <TaskEditForm
                {...props}
                updateTask={this.updateTask}
                tasks={this.tasks}
              />
            );
          }}
        />
        <Route
          exact
          path="/tasks"
          render={props => {
            return (
              <Task
                {...props}
                tasks={this.state.tasks}
                deleteTask={this.deleteTask}
              />
            );
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route
          exact
          path="/events/new"
          render={props => {
            return <EventForm addEvent={this.addEvent} {...props} />;
          }}
        />

        <Route
          exact
          path="/events/:eventsId(\d+)/edit"
          render={props => {
            return (
              <EditEventForm
                {...props}
                events={this.state.events}
                updateEvent={this.updateEvent}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
