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
import SearchList from "./search/SearchList"
import Task from "./tasks/Task";
import Events from "./events/Events";
import EventForm from "./events/EventForm";
import EditEventForm from "./events/EditEventForm";
import ArticleList from "./articles/Articles";
import ArticleForm from "./articles/ArticleForm";
import ArticleEditForm from "./articles/ArticleEditForm";
import MessageList from "./messages/Messages";
import Friends from "./friends/Friends";
import TaskForm from "./tasks/TaskForm";
import TaskEditForm from "./tasks/TaskEditForm";
import Welcome from "./welcome/welcome";
import DashboardList from "./dashboard/Dashboard";

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
        this.setState({ friends: friends });
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
      .then(messages => {
        let newMessages = messages.sort((a, b) => a.timestamp - b.timestamp);
        this.setState({ messages: newMessages });
      });
  }

  deleteTask = id => {
    TaskHandler.delete(id)
      .then(() => TaskHandler.getAll())
      .then(tasks => {
        this.setState({ tasks: tasks });
      });
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

  deleteMessage = id => {
    MessageHandler.removeAndList(id).then(messages => {
      let newMessages = messages.sort((a, b) => a.timestamp - b.timestamp);
      this.setState({ messages: newMessages });
    });
  };

  addMessage = object => {
    MessageHandler.post(object).then(messages => {
      let newMessages = messages.sort((a, b) => a.timestamp - b.timestamp);
      this.setState({ messages: newMessages });
    });
  };

  editMessage = object => {
    MessageHandler.put(object).then(messages => {
      let newMessages = messages.sort((a, b) => a.timestamp - b.timestamp);
      this.setState({ messages: newMessages });
    });
  };

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
        this.props.history.push("/events");
      });
  };

  addFriend = object => {
    FriendHandler.post(object)
    .then(friends => {
      this.setState({friends: friends})})
  }

  deleteFriend = id => {
    FriendHandler.delete(id)
      .then(() => FriendHandler.getAll())
      .then(friends => {
        this.setState({ friends: friends });
        this.props.history.push("/friends");
      });
  };

  updateEvent = editEvent => {
    EventHandler.put(editEvent)
      .then(() => EventHandler.get("?_expand=user"))
      .then(events => {
        let sortEvents = this.sortEvent(events);
        this.setState({ events: sortEvents });
        this.props.history.push("/events");
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
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <DashboardList
                  {...props}
                  state={this.state}
                  articles={this.state.articles}
                  deleteArticle={this.deleteArticle}
                  updateArticle={this.updateArticle}
                  messages={this.state.messages}
                  tasks={this.state.tasks}
                  deleteTask={this.deleteTask}
                  updateTask={this.updateTask}
                  events={this.state.events}
                  deleteEvent={this.deleteEvent}
                  updateEvennt={this.updateEvent}
                />
              );
            } else {
              return <Redirect to="/welcome" />;
            }
          }}
        />

        <Route
          exact
          path="/search"
          render={props => {
            if (this.isAuthenticated()) {
              return <SearchList friends={this.state.friends} addFriend={this.addFriend} results={this.props.results} />;
            } else {
              return <Redirect to="/welcome" />;
            }
          }}
        />

        <Route
          exact
          path="/friends"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Friends
                  {...props}
                  friends={this.state.friends}
                  users={this.state.users}
                  deleteFriend={this.deleteFriend}
                />
              );
            } else {
              return <Redirect to="/welcome" />;
            }
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
                  friends={this.state.friends}
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
          path="/messages"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <MessageList
                  messages={this.state.messages}
                  users={this.state.users}
                  addMessage={this.addMessage}
                  deleteMessage={this.deleteMessage}
                  editMessage={this.editMessage}
                  addFriend={this.addFriend}
                  friends={this.state.friends}
                  {...props}
                />
              );
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
            if (this.isAuthenticated()) {
              return (
                <TaskEditForm
                  {...props}
                  updateTask={this.updateTask}
                  tasks={this.tasks}
                />
              );
            } else {
              return <Redirect to="/welcome" />;
            }
          }}
        />
        <Route
          exact
          path="/tasks"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <Task
                  {...props}
                  tasks={this.state.tasks}
                  deleteTask={this.deleteTask}
                  updateTask={this.updateTask}
                />
              );
            } else {
              return <Redirect to="/welcome" />;
            }
          }}
        />

        <Route
          exact
          path="/events/new"
          render={props => {
            if (this.isAuthenticated()) {
              return <EventForm addEvent={this.addEvent} {...props} />;
            } else {
              return <Redirect to="/welcome" />;
            }
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
