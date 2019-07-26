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
            <h4>Task List:</h4>
            <div className="card">
            <section className="tasks">
                {

                    this.createTasks(this.props.tasks).map(task =>
                        task.iscompleted === false ?
                        <div key ={task.id} >
                            <div className="card-body">
                                <div className="card-title">

                                <h6>Task Name: {task.taskName}</h6>
                                <p>Due Date: {task.completedate}</p>
                                </div>
                            </div>
                        </div>:""
                        )
                }
            </section>
            </div>
            </React.Fragment>
        )
    }
}