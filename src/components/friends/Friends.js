import React, {Component} from 'react';
import FriendCard from "./FriendCard"

export default class Friends extends Component {

  sortFriend = arr => {
    let id = +sessionStorage.getItem("userId");
    let friendArr = arr.filter(friend => {
      if (friend.userId_1 === id || friend.userId_2 === id) {
        return friend;
      }
    });
    let newArr = this.showFriends(friendArr)
    return newArr
  };

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
    let stateArr = this.createEvents(friendArr)
    return stateArr
  }

createEvents = arr => {
  let friendArr = []
  this.props.users.forEach( user => {
    arr.forEach( friendId => {
      if (user.id === friendId) {
        friendArr.push(user)
      }
    })
  })
  return friendArr
}

  render() {
    return (
      <React.Fragment>
        <h1>Friends</h1>
        <section className="friends">
        {
          this.sortFriend(this.props.friends).map( user => <FriendCard key={user.id} user={user} friends={this.props.friends} {...this.props} deleteFriend={this.props.deleteFriend} />)
        }
        </section>
      </React.Fragment>
    )
  }
}