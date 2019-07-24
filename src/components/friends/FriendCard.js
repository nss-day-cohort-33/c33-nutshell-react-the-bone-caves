import React, {Component} from 'react';


export default class EventCard extends Component {
state = {
  id: this.props.user.id,
  username: this.props.user.username,
  email: this.props.user.email
}

  render() {
    return (
        <div key={this.state.id} className="friend-card">
          <h3 className="friend-username">{this.state.username}</h3>
          <p>Email: {this.state.email}</p>
        </div>
    )
  }
}