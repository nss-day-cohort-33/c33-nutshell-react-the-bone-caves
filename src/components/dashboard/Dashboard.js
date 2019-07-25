import React, { Component } from "react";
import MessageList from "../messages/Messages";
import TaskDash from "../tasks/TaskDash";
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
        <TaskDash {...this.props}/>
      </React.Fragment>
    );
  }
}

export default DashboardList;