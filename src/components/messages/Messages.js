import React, { Component } from "react";
import MessageCard from "./MessageCard"

export default class MessageList extends Component {
    render() {
      return (
        <React.Fragment>
          <section className="messages">
            {this.props.messages.map(message => (
              <MessageCard key={message.id} message={message} {...this.props}/>
            ))}
          </section>
        </React.Fragment>
      );
    }
  }