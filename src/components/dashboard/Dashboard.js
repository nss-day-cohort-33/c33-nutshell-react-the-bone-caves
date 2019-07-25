import React, { Component } from "react";
import Events from "../events/Events";
import MessageList from "../messages/Messages";
import Task from "../tasks/Task";
import ArticleDash from "../articles/ArticlesDash";
import EventDash from "../events/EventDash"

class DashboardList extends Component {
  render() {
    return (
      <React.Fragment>
        <ArticleDash {...this.props}
        friends={this.props.state.friends}/>
        <EventDash {...this.props}
        friends={this.props.state.friends}/>
        <MessageList {...this.props}/>
        <Task {...this.props}/>
      </React.Fragment>
    );
  }
}

export default DashboardList;