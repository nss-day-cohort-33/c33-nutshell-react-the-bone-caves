import React, { Component } from "react";
import ArticleList from "../articles/Articles";
import Events from "../events/Events";
import MessageList from "../messages/Messages";
import Task from "../tasks/Task";

class DashboardList extends Component {
  render() {
    return (
      <React.Fragment>
        <ArticleList {...this.props} 
        friends={this.props.state.friends}/>
        <Events {...this.props}
        friends={this.props.state.friends}/>
        <MessageList {...this.props}/>
        <Task {...this.props}/>
      </React.Fragment>
    );
  }
}

export default DashboardList;