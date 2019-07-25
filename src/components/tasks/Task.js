// Matthew McDevitt
// this assembles the components for task and have a add task btn
import React, { Component } from 'react'
import TaskCard from "./TaskCard"
import "./Task.css"
export default class Task extends Component {
// Filter to make sure that the tasks are the current user
    createTasks = () => {
        let user = +sessionStorage.getItem("userId");
        let taskArr = []
        this.props.tasks.forEach(task => {
            if (task.userId === user) {
                taskArr.push(task)
            }
        })
        return taskArr
    }

    render() {
        return (
            <div>
                <h1 className="title">Task List</h1>
                <div className="AddTaskButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/tasks/new")
                        }
                        }>Add Task</button>
                </div>

                <section className="tasks">


                    {
                        this.createTasks(this.props.tasks).map(task =>
                            task.iscompleted === false ?
                                <div key={task.id}  >
                                    <TaskCard key={task.id} task={task} {...this.props} updateTask={this.props.updateTask} />
                                </div> : ""
                        )
                    }


                </section>
            </div>
        )
    }
}