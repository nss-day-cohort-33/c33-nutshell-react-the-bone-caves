import React, { Component } from "react";
import EditableLabel from "react-inline-editing";

export default class MessageCard extends Component {
  constructor(props) {
    super(props);

    this._handleFocusOut = this._handleFocusOut.bind(this);
  }


  _handleFocusOut(text) {
    console.log(text);
    let newMessage = {
      userId: +sessionStorage.getItem("userId"),
      username: this.props.message.username,
      message: text,
      timestamp: this.props.message.timestamp,
      id: this.props.message.id
    };
    this.props.editMessage(newMessage);
  }

  checkFriends = (currentUser, id) => {
    let yesOrNo = true
    this.props.friends.forEach(conection => {
      if((currentUser === conection.userId_1 ||currentUser === conection.userId_2 )&&(id === conection.userId_1 ||id === conection.userId_2)){
        console.log("here")
        yesOrNo = false
      }
    })
    return yesOrNo
  }

  addNewFriend = (id) => {
    console.log("clicked")
    let currentUser = +sessionStorage.getItem("userId")
    console.log(this.checkFriends(currentUser, id))

    if(id !== currentUser && this.checkFriends(currentUser, id) ){
      let friendObject = {
        userId_1: +sessionStorage.getItem("userId"),
        userId_2: id
      }
      this.props.addFriend(friendObject)
    }
  }

  render() {
    return (
      <div key={this.props.message.id} className="card">
        <div className="card-body">
          <div className="card-title">
            <h5 onClick={() => this.addNewFriend(this.props.message.userId) } >{this.props.message.username}</h5>
            <EditableLabel
              text={this.props.message.message}
              onFocusOut={this._handleFocusOut}
            >
              {this.props.message.message}
            </EditableLabel>
            <a
              href="javascript:void(0)x"
              onClick={() => this.props.deleteMessage(this.props.message.id)}
              className="card-link"
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  }
}
