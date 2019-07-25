import React, { Component } from "react";


export default class TaskCard extends Component {


  handleCheck = event => {
    event.preventDefault()
    this.props.task.iscompleted = !this.props.task.iscompleted
    this.props.updateTask(this.props.task)
  }
  render() {

    return (
      <div key={this.props.task.id} className="card">

        <div className="card-body">
          <input

            id="iscompleted"
            type="checkbox"
            checked={this.props.task.iscompleted}
            onChange={this.handleCheck}
          />
          <a
            onClick={() =>
              this.props.history.push(`/tasks/${this.props.task.id}/edit`)
            }
            className="card-link"
          >
            <h5 className="card-title">{this.props.task.taskName}</h5>

          <p>Due Date: {this.props.task.completedate}</p>
          </a>
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
