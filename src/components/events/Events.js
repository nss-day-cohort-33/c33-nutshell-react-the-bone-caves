import React, {Component} from 'react';
import './Events.css'
import EventCard from './EventCard'

export default class Events extends Component {
  showFriends = arr => {
    let id = +sessionStorage.getItem("userId")
    let friendArr = []
    arr.forEach( friend => {
      for (let foo of Object.entries(friend)) {
        let key = foo[0]
        let splitKey = key.split("_")
        if (splitKey[0] === "userId" && foo[1] !== id) {
          friendArr.push(foo[1])
        }
      }
    })
    friendArr.push(id)
    let stateArr = this.createEvents(friendArr)
    return stateArr
  }

createEvents = arr => {
  let eventArr = []
  this.props.events.forEach( event => {
    arr.forEach( user => {
      if (event.userId === user) {
        eventArr.push(event)
      }
    })
  })
  return eventArr
}


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
            this.showFriends(this.props.friends).map( event => <EventCard key={event.id} event={event} deleteEvent={this.props.deleteEvent} updateEvent={this.props.updateEvent} {...this.props} />)
            //this.state.events.map( user => {
              //this.props.events.forEach( event => {
               // if (event.userId === user) {
               //   return <EventCard key={event.id} event={event} deleteEvent={this.props.deleteEvent} updateEvent={this.props.updateEvent} {...this.props} />
               // }
             // })
           // })

            //this.props.events.map(event => {
             // return <EventCard key={event.id} event={event} deleteEvent={this.props.deleteEvent} updateEvent={this.props.updateEvent} {...this.props} />
           // })
          }
        </section>
      </React.Fragment>
     )
   }
 }
