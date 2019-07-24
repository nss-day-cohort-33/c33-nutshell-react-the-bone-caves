import React, { Component } from "react";
import ArticleList from "../articles/Articles";
import Events from "../events/Events";
import MessageList from "../messages/Messages";
import Task from "../tasks/Task";
import NavBar from '../nav/NavBar'

class DashboardList extends Component {
  render() {
    return (
      <React.Fragment>
        <ArticleList {...this.props} />
        <Events {...this.props}/>
        <MessageList {...this.props}/>
        <Task {...this.props}/>
      </React.Fragment>
    );
  }
}

export default DashboardList;