import React, { Component } from "react";

export default class TaskEditForm extends Component{
    state = {
        userId: "",
        task: "",
        completedate: "",
        iscompleted: false,
    };
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      }

      updateTask= evt => {
        evt.preventDefault();
          const task = {
            task: this.state.task,
            completedate: this.state.completedate,
            userId: parseInt(this.state.userId),
            iscompleted: false,
          };

          // Create the animal and redirect user to animal list
          this.props
            .addTask(task)
            .then(() => this.props.history.push("/tasks"));
      };
      render() {
        return (
          <React.Fragment>
            <form className="taskForm">
              <div className="form-group">
                <label htmlFor="task">Task name</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="task"
                  placeholder="Task"
                  value = {this.state.task}
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
                  placeholder="Date of task"
                  value = {this.state.completedate}
                />
              </div>
              <button
                type="submit"
                onClick={this.constructNewTask}
                className="btn btn-primary"
                >
                Submit
              </button>
            </form>
            </React.Fragment>

        );
      }
    }
