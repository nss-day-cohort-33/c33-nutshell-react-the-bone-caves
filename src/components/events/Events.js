import React, {Component} from 'react';
import './Events.css'
import EventCard from './EventCard'

export default class Events extends Component {
  state = {}
   render() {
     return(
      <React.Fragment>
        <h1>Events</h1>
        <div className="eventButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.props.history.push("/events/new")}
          >
            Add Event
          </button>
        </div>
        <section className="events">
          {
            this.props.events.map(event => {
              return <EventCard key={event.id} event={event} {...this.props} />
            })
          }
        </section>
      </React.Fragment>
     )
   }
 }
