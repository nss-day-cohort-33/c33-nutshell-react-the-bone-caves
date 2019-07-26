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
        <div className="parent-Dash-Div">
          <div className="dashboard-row">
            <div className="dashboard-div-box">
              <h3>Messages</h3>
              <div className="dashboard-div">
                <MessageList {...this.props}/>
              </div>
            </div>
            <div className="dashboard-div-box">
              <h3>Articles</h3>
              <div className="dashboard-div">
                <ArticleDash {...this.props}
                friends={this.props.state.friends}/>
              </div>
            </div>
          </div>
          <div className="dashboard-row">
            <div className="dashboard-div-box">
              <h3>Events</h3>
              <div className="dashboard-div">
                <EventDash {...this.props}
                friends={this.props.state.friends}/>
              </div>
            </div>
            <div className="dashboard-div-box">
              <h3>Tasks</h3>
              <div className="dashboard-div">
                <TaskDash {...this.props}/>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardList;