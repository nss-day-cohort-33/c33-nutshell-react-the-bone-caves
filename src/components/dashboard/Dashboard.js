import React, { Component } from "react";
import MessageList from "../messages/Messages";
import TaskDash from "../tasks/TaskDash";
import ArticleDash from "../articles/ArticlesDash";
import EventDash from "../events/EventDash"
import "./Dashboard.css"

class DashboardList extends Component {
  render() {
    return (
      <React.Fragment>
      <div className="dashboard-row">
        <div className="dashboard-div">
          <MessageList {...this.props}/>
        </div>
        <div className="dashboard-div">
          <ArticleDash {...this.props}
          friends={this.props.state.friends}/>
        </div>
          <br></br>
        <div className="dashboard-div">
          <EventDash {...this.props}
          friends={this.props.state.friends}/>
        </div>
          <br></br>
          <br></br>
        <div className="dashboard-div">
          <TaskDash {...this.props}/>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default DashboardList;