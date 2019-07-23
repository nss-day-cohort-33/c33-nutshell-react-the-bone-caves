
import React, { Component } from 'react'
import TaskCard from "./TaskCard"
import "./Task.css"


export default class Task extends Component {
    render() {
        return (
            <div>
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
                            this.props.tasks.map(task =>
                                <TaskCard key={task.id} task={task} {...this.props} updateTask={this.updateTask}/>
                            )
                        }


                </section>
            </div>
        )
    }
}