import React, {Component} from 'react';


export default class EventCard extends Component {
state = {
  id: this.props.user.id,
  username: this.props.user.username,
  email: this.props.user.email,
  saveDisabled: false
}

sortFriend = arr => {
  let id = +sessionStorage.getItem("userId");
  let friendArr = arr.filter(friend => friend.userId_1 === id || friend.userId_2 === id ? friend : '');
  this.getRelationshipId(friendArr)
};

getRelationshipId = arr => {
  arr.forEach( friendShip => {
    if (friendShip.userId_1 === this.state.id || friendShip.userId_2 === this.state.id) {
        if (window.confirm(`Are you sure you want to remove ${this.state.username} as a friend?`)) {
          this.props.deleteFriend(friendShip.id)
        } else {
          this.setState({saveDisabled: false})
        }
    }
  })


}
  render() {
    return (
        <div key={this.state.id} className="friend-card">
          <h3 className="friend-username">{this.state.username}</h3>
          <p>Email: {this.state.email}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              this.setState({saveDisabled: true})
              this.sortFriend(this.props.friends)
            }}
            disabled={this.state.saveDisabled}
          >
            Remove Friend
          </button>
        </div>

    )
  }
}