import React, {Component} from 'react';

export default class EventCard extends Component {
  render() {
    return (
        <div key={this.props.event.id} className="event-card">
          <h3>{this.props.event.event_name}</h3>
          <p><b>Day</b>: {this.props.event.date}</p>
          <p><b>Time</b>: {this.props.event.time}</p>
          <p><b>Location</b>: {this.props.event.location}</p>
        </div>
    )
  }
}