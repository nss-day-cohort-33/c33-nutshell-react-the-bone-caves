import React, { Component } from "react";
import SearchCard from "./SearchCard";
import './SearchList.css'


export default class SearchList extends Component {
  sortResults = (arr1, arr2) => {
    let newArr = [];
    arr1.forEach(username => {
      newArr.push(username);
    });
    arr2.forEach(email => {
      newArr.push(email);
    });

    let finalArr = Array.from(new Set(newArr.map(a => a.id))).map(id => {
      return newArr.find(a => a.id === id);
    });
    return finalArr;
  };

  render() {
    return (
      <React.Fragment>
        <h1>Search Results</h1>
        {this.props.results.userResults.length > 0 ? (
          <React.Fragment>
            <h3>Users</h3>
            <section className="user-section">
              {this.sortResults(
                this.props.results.userResults,
                this.props.results.emailResults
              ).map(user => user.id !== +sessionStorage.getItem("userId") ? <SearchCard key={user.id} user={user} friends={this.props.friends} addFriend={this.props.addFriend} /> : '')}
            </section>
          </React.Fragment>
        ) : (
          <h3>User not found.</h3>
        )}
      </React.Fragment>
    );
  }
}
