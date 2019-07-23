import React, {Component} from 'react';
import './Events.css'
import EventCard from './EventCard'

export default class Events extends Component {
  state = {}
   render() {
     return(
      <React.Fragment>
        <h1>Events</h1>
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
