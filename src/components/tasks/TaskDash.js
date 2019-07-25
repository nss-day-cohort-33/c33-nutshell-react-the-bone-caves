import React, { Component } from "react";

export default class TaskDash extends Component {

    createTasks = () => {
        let user = +sessionStorage.getItem("userId");
        let taskArr = []
        this.props.tasks.forEach( task => {
            if (task.userId === user) {
              taskArr.push(task)
            }
          })
        return taskArr
      }

    render() {
        return (
            <React.Fragment>
            <section className="tasks">
            <h1>Task List</h1>
                {

                    this.createTasks(this.props.friends).map(task =>
                        <div key ={task.id} >
                            <div className="card-body">
                                <div className="card-title">

                                <h6>Task Name: {task.taskName}</h6>
                                <p>Due Date: {task.completedate}</p>
                                </div>
                            </div>
                        </div>
                        )
                }
            </section>
            </React.Fragment>
        )
    }
}