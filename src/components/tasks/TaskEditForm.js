import React, { Component } from "react";

export default class TaskEditForm extends Component{
    state = {
        taskName: "",
        completedate: ""
    };
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      }

      updateTask= evt => {
        evt.preventDefault();
          const taskEdit = {
            id: this.props.match.params.id,
            taskName: this.state.taskName,
            completedate: this.state.completedate
          };


          this.props
            .updateTask(taskEdit)
            .then(() => this.props.history.push("/tasks"));
      };
      render() {
        return (
          <React.Fragment>
            <form className="taskForm">
              <div className="form-group">
                <label htmlFor="taskName">Task name</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="taskName"
                  value = {this.props.taskName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="completedate"> Task Date</label>
                <input
                  type="date"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="completedate"
                  value = {this.props.completedate}
                />
              </div>
              <button
                type="submit"
                onClick={this.updateTask}
                className="btn btn-primary"
                >
                Submit
              </button>
            </form>
            </React.Fragment>

        );
      }
    }
