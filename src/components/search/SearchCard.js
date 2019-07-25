import React, { Component } from "react";

export default class SearchCard extends Component {
  state = {
    buttonDisabled: false
  };

  checkFriends = (currentUser, id) => {
    let yesOrNo = true;
    this.props.friends.forEach(conection => {
      if (
        (currentUser === conection.userId_1 ||
          currentUser === conection.userId_2) &&
        (id === conection.userId_1 || id === conection.userId_2)
      ) {
        yesOrNo = false;
      }
    });
    return yesOrNo;
  };

  addNewFriend = id => {
    console.log("clicked");
    let currentUser = +sessionStorage.getItem("userId");
    let friendObject = {
      userId_1: currentUser,
      userId_2: id
    };
    this.props.addFriend(friendObject);
    alert(`${this.props.user.username} successfully added!`);
  };

  render() {
    return (
      <div
        key={this.props.user.id}
        className={
          this.checkFriends(
            +sessionStorage.getItem("userId"),
            this.props.user.id
          )
            ? "user-card card"
            : "user-friend card"
        }
      >
        <div className="card-body">
          <div className="card-title">
            <p>
              <b>Username:</b> {this.props.user.username}
            </p>
            <p>
              <b>Email:</b> {this.props.user.email}
            </p>
            <button
              className="btn btn-success"
              type="button"
              style={{
                display: this.checkFriends(
                  +sessionStorage.getItem("userId"),
                  this.props.user.id
                )
                  ? ""
                  : "none"
              }}
              onClick={() => {
                this.setState({ buttonDisabled: true });
                this.addNewFriend(this.props.user.id);
              }}
              disabled={this.state.buttonDisabled}
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    );
  }
}
