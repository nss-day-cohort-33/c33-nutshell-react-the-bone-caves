import React, { Component } from "react";

export default class SearchCard extends Component {
  // sortFriend = (arr, id) => {
  //   let currUser = +sessionStorage.getItem("userId");
  //   let friendArr = arr.filter(friend => {
  //     if (friend.userId_1 === currUser || friend.userId_2 === currUser) {
  //       return friend;
  //     }
  //   });
  //   return this.showFriends(friendArr, id);
  // };

  // showFriends = (arr, id) => {
  //   let currUser = +sessionStorage.getItem("userId");
  //   let friendArr = [];
  //   arr.forEach(friend => {
  //     for (let foo of Object.entries(friend)) {
  //       let key = foo[0];
  //       let splitKey = key.split("_");
  //       if (splitKey[0] === "userId" && foo[1] !== currUser) {
  //         friendArr.push(foo[1]);
  //       }
  //     }
  //   });
  //   friendArr.push(currUser)
  //   return this.addButtons(friendArr, id);
  // };

  // addButtons = (arr, id) => {
  //   let newArr = arr.filter( userId => {
  //     if (userId === id) {
  //       return id
  //     }
  //   });
  //   return newArr
  // };

  // createEvents = arr => {
  //   let eventArr = [];
  //   this.props.events.forEach(event => {
  //     arr.forEach(user => {
  //       if (event.userId === user) {
  //         eventArr.push(event);
  //       }
  //     });
  //   });
  //   return eventArr;
  // };
  render() {
    return (
      <li key={this.props.user.id} className="user-card">
        <p>Username: {this.props.user.username}</p>
        <p>Email: {this.props.user.email}</p>
        <button
          type="button"
        >
          Add User
        </button>
      </li>
    );
  }
}
