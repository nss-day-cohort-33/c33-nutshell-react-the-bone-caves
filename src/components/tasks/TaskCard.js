import React, { Component } from "react"




export default class TaskCard extends Component {
    // state = {
    //     completedate:""
    // }
    // handleFieldChange = evt => {
    //     const stateToChange = {}
    //     stateToChange[evt.target.id] = evt.target.value;
    //     this.setState(stateToChange);
    //   }
    //   taskComplete =evt =>{
    //     evt.preventDefault();
    //     const task = {
    //       id: this.props.match.params.taskId,
    //       iscompleted: this.state.iscompleted
    //       }

    //       this.props
    //         .taskComplete(task)

    //   };
    //   componentDidMount() {
    //     updateTask.get(this.props.match.params.id)
    //     .then(tasks => {
    //       this.setState({
    //         id: this.props.match.params.taskId,
    //         iscompleted: tasks.state.iscompleted
    //       });
    //     });
    //   }

    render() {
        return (
            <div key={this.props.task.id} className="card">
                <div className="card-body">
                <input  className="task-checkbox" type="checkbox" name="vehicle1" value="iscompleted"
                // onClick={()=> this.task.iscompleted = true}
                >
                </input>
                    <h5 className="card-title">
                       {this.props.task.task }
                    </h5>
                    <p>Due Date: {this.props.task.completedate}</p>
                    <button onClick={() => this.props.deleteTask(this.props.task.id)}
                         className="card-link"> Delete</button>
                </div>
            </div>
        )
    }

  }
