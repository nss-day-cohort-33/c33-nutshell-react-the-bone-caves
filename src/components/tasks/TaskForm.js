import React, { Component } from "react";


export default class TaskForm extends Component{
    state = {
        userId: "",
        taskName: "",
        completedate: "",
        iscompleted: false

    };
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      }

      constructNewTask= evt => {
        evt.preventDefault();
          const task = {
            taskName: this.state.taskName,
            completedate: this.state.completedate,
            iscompleted: false
          };

          // Create the animal and redirect user to animal list
          this.props
            .addTask(task)
            .then(() => this.props.history.push("/tasks"));
        }




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
                  placeholder="Task"
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