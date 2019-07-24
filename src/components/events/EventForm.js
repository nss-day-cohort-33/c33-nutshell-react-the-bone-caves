import React, {Component} from 'react'

export default class EventForm extends Component {
  state ={
    addUserId: '',
    addEvent_name: '',
    addDate: '',
    addTime: '',
    addLocation: ''
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  constructNewEvent = evt => {
    evt.preventDefault()
    let newName = document.querySelector("#addEvent_name").value
    let newDate = document.querySelector("#addDate").value
    let newTime = document.querySelector("#addTime").value
    let newLocation = document.querySelector("#addLocation").value
    if (newName && newDate && newTime && newLocation) {
      const event = {
        userId: +sessionStorage.getItem("userId"),
        event_name: this.state.addEvent_name,
        date: this.state.addDate,
        time: this.state.addTime,
        location: this.state.addLocation
      }
      this.props.addEvent(event)
    } else {
      alert("Please fill out all fields!")
    }
  }

  render() {
    return (
      <React.Fragment>
        <form className="eventForm">
          <div className="form-group">
            <label htmlFor="addEvent_name">Name Of Event</label>
            <input
              required
              type="text"
              onChange={this.handleFieldChange}
              className="form-control"
              id="addEvent_name"
              placeholder="Event Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="addDate">Day Of Event</label>
            <input
              required
              type="date"
              onChange={this.handleFieldChange}
              id="addDate"
              placeholder="Event Date"
            />
          </div>
          <div className="form-group">
            <label htmlFor="addTime">Time Of Event</label>
            <input
              required
              type="time"
              onChange={this.handleFieldChange}
              className="for-control"
              id="addTime"
              placeholder="Event Time"
            />
          </div>
          <div className="form-group">
            <label htmlFor="addLocation">Location of Event</label>
            <input
              required
              type="text"
              onChange={this.handleFieldChange}
              id="addLocation"
              placeholder="Event Location"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructNewEvent}
            className="btn btn-primary"
          >
            Create Event
          </button>
        </form>
      </React.Fragment>
    )
  }
}