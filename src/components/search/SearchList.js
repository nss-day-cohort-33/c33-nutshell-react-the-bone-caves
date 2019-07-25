import React, {Component} from 'react';

export default class SearchList extends Component {

  sortResults = (arr1, arr2) => {
    let newArr = []
    arr1.forEach( username => {
      newArr.push(username)
    });
    arr2.forEach( email => {
      newArr.push(email)
    });

    let finalArr = Array.from(new Set(newArr.map(a => a.id)))
    .map(id => {
    return newArr.find(a => a.id === id)
    })
    return finalArr
  }

  render() {
    return (
      <React.Fragment>
        <h3>Search Results</h3>
        { this.props.results.userResults.length > 0 ? <ul><h3>Users</h3> {this.sortResults(this.props.results.userResults, this.props.results.emailResults).map(user => <li key={user.id}><p>Username: {user.username}</p><p>Email: {user.email}</p></li>)}</ul> : ""}
      </React.Fragment>
    )
  }
}