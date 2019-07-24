import React, { Component } from "react";
import TaskHandler from "../apiManager/TaskHandler"

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

      updateCurrentTask= evt => {
        evt.preventDefault()
          const taskEdit = {
            id: this.props.match.params.id,
            taskName: this.state.taskName,
            completedate: this.state.completedate
          }


          this.props.updateTask(taskEdit)
            .then(() => this.props.history.push("/tasks"))

      }
      componentDidMount() {
        TaskHandler.get(this.props.match.params.id)
         .then(task => {
           this.setState({
             taskName: task.taskName,
             completedate: task.completedate,
           });
         });
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
                  value = {this.state.taskName}
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
                  value = {this.state.completedate}
                />
              </div>
              <button
                type="submit"
                onClick={this.updateCurrentTask}
                className="btn btn-primary"
                >
                Submit
              </button>
            </form>
            </React.Fragment>

        );
      }
    }
