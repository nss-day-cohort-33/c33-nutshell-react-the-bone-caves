import React, {Component} from 'react';
import '../apiManager/EventHandler'
import EventHandler from '../apiManager/EventHandler';

export default class EventForm extends Component {
  state ={
    editEvent_name: '',
    editDate: '',
    editTime: '',
    editLocation: ''
  }

  componentDidMount() {
    EventHandler.get(this.props.match.params.eventsId)
      .then(event => this.setState({
              editUserId: event.userId,
              editEvent_name: event.event_name,
              editDate: event.date,
              editTime: event.time,
              editLocation: event.location
            })
          )
  }

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }



  constructNewEvent = evt => {
    evt.preventDefault()
    let editName = document.querySelector("#editEvent_name").value
    let editDate = document.querySelector("#editDate").value
    let editTime = document.querySelector("#editTime").value
    let editLocation = document.querySelector("#editLocation").value
    if (editName && editDate && editTime && editLocation) {
      const event = {
        id: this.props.match.params.eventsId,
        event_name: this.state.editEvent_name,
        date: this.state.editDate,
        time: this.state.editTime,
        location: this.state.editLocation
      }
      this.props.updateEvent(event)
    } else {
      alert("Please fill out all fields!")
    }
  }

  render() {
    return (
      <React.Fragment>
        <form className="eventForm">
          <div className="form-group">
            <label htmlFor="editEvent_name">Name Of Event</label>
            <input
              required
              type="text"
              onChange={this.handleFieldChange}
              className="form-control"
              id="editEvent_name"
              value={this.state.editEvent_name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editDate">Day Of Event</label>
            <input
              required
              type="date"
              onChange={this.handleFieldChange}
              id="editDate"
              value={this.state.editDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editTime">Time Of Event</label>
            <input
              required
              type="time"
              onChange={this.handleFieldChange}
              className="for-control"
              id="editTime"
              value={this.state.editTime}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editLocation">Location of Event</label>
            <input
              required
              type="text"
              onChange={this.handleFieldChange}
              id="editLocation"
              value={this.state.editLocation}
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