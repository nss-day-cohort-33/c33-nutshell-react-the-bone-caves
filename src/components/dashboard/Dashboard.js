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
        <br></br>
        <EventDash {...this.props}
        friends={this.props.state.friends}/>
        <br></br>
        <MessageList {...this.props}/>
        <br></br>
        <TaskDash {...this.props}/>
      </React.Fragment>
    );
  }
}

export default DashboardList;