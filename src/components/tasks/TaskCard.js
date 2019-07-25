import React, { Component } from "react";
import TaskHandler from "../apiManager/TaskHandler"


export default class TaskCard extends Component {
  state = {
    userId :this.props.task.userId,
    taskName: this.props.task.taskName,
    completedate: this.props.task.completedate,
    iscompleted: false
  };
  updateTask

  handleCheck = event => {
    event.preventDefault()
    const checkEdit = {
        id: this.props.task.id,
        userId: this.props.task.userId,
        taskName: this.props.task.taskName,
        completedate: this.props.task.completedate,
        iscompleted: event.target.checked
    }
              console.log(checkEdit)
              this.props.updateTask(checkEdit)
  }

  componentDidMount() {
    TaskHandler.get(this.props.task.id)
     .then(task => {
       this.setState({
        taskName: task.taskName,
        completedate: task.completedate,
        iscompleted: task.iscompleted
       });
     });
   }
  render() {

    return (
      <div key={this.props.task.id} className="card">
        <input
        // key={this.props.task.id}
        id = "iscompleted"
          type="checkbox"
          checked={this.state.iscompleted}
          onChange={this.handleCheck}
        />
        <div className="card-body">
          <a
            onClick={() =>
              this.props.history.push(`/tasks/${this.props.task.id}/edit`)
            }
            className="card-link"
          >
            <h5 className="card-title">{this.props.task.taskName}</h5>
          </a>
          <p>Due Date: {this.props.task.completedate}</p>
          <button
            onClick={() => this.props.deleteTask(this.props.task.id)}
            className="card-link"
          >

            Delete
          </button>
        </div>
      </div>
    );
  }
}
