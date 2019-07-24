import React, {Component} from 'react';


export default class EventCard extends Component {
state = {
  id: this.props.event.id,
  event_name: this.props.event.event_name,
  date: this.props.event.date,
  time: this.props.event.time,
  locations: this.props.event.location,
  userId: this.props.event.userId,
  user: this.props.event.user,
  saveDisabled: false
}

isUser = () => this.state.userId === +sessionStorage.getItem("userId");

  render() {
    return (
        <div key={this.state.id} className={this.isUser() ? "event-card user-event" : "event-card friend-event"}>
          <h3 className="event-name">{this.state.event_name}</h3>
          {
            !this.isUser() ? <h6>Created By: {this.state.user.username}</h6> : <h6>You created this event.</h6>
          }
          <p className="event-date"><b>Day</b>: {this.state.date}</p>
          <p className="event-time"><b>Time</b>: {this.state.time}</p>
          <p className="event-location"><b>Location</b>: {this.state.locations}</p>
          <button
            id={`editEvent-${this.state.id}`}
            className="btn btn-warning"
            onClick={() => this.props.history.push(`/events/${this.state.id}/edit`)}
            style={{display: this.isUser() ? "" : "none"}}
          >
            Edit Event
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.setState(
              {saveDisabled: true},
              this.props.deleteEvent(this.props.event.id)
            )}
            style={{display: this.isUser() ? "" : "none"}}
            disabled={this.state.saveDisabled}
          >
            Delete Event
          </button>
        </div>
    )
  }
}