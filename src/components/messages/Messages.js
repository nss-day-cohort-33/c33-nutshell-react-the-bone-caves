import React, { Component } from "react";
import MessageCard from "./MessageCard";

export default class MessageList extends Component {
    state = {
        userId: "",
        message: "",
        timestamp: ""
    }
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      };

      createAndAdd = event => {
        let theUser = +sessionStorage.getItem("userId")
        let findUser = this.props.users.find(user => user.id === theUser )
        let newMessage = {
              userId: theUser,
              username: findUser.username,
              message: this.state.message,
              timestamp: Date.now()
          }
        this.props.addMessage(newMessage)



      }

  render() {
    return (
      <React.Fragment>
        <fieldset className="form-group">
          <label>Enter Message Here</label>
          <textarea onChange={this.handleFieldChange} id="message" className="form-control" rows="3" />
          <button onClick={this.createAndAdd}>send</button>
        </fieldset>
        <section className="messages">
          {this.props.messages.map(message => (
            <MessageCard key={message.id} message={message} {...this.props} />
          ))}
        </section>
      </React.Fragment>
    );
  }
}
