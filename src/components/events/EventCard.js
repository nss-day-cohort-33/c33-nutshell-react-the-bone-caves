import React, {Component} from 'react';


export default class EventCard extends Component {
state = {
  id: this.props.event.id,
  event_name: this.props.event.event_name,
  date: this.props.event.date,
  time: this.props.event.time,
  locations: this.props.event.location,
  userId: this.props.userId
}

  render() {
    return (
        <div key={this.state.id} className="event-card">
          <h3>{this.state.event_name}</h3>
          <p><b>Day</b>: {this.state.date}</p>
          <p><b>Time</b>: {this.state.time}</p>
          <p><b>Location</b>: {this.state.location}</p>
          <button
            id={`editEvent-${this.state.id}`}
            className="btn btn-warning"
            onClick={() => this.props.history.push(`/events/${this.state.id}/edit`)}
          >
            Edit Event
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.props.deleteEvent(this.props.event.id)}
          >
            Delete Event
          </button>
        </div>
    )
  }
}