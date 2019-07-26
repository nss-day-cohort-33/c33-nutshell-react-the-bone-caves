import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {
  state = {
    saveDisabled: false
  }

  logOut = () => {
    sessionStorage.clear()
    this.props.history.push("/welcome/login")
  }

    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/articles">News</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/friends">Friends</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/messages">Messages</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/events">Events</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks">Tasks</Link>
                    </li>
                    <li className="nav-item">
                      <input type="text" placeholder="Search" id="searchBar" className="search form-control" onKeyPress={this.props.inputEvent} ></input>
                    </li>
                    <li className="nav-item">
                      <button className="logout-btn btn"
                      onClick={() => {
                        this.setState({saveDisabled: true})
                        this.logOut()
                      }}
                      style={{display: sessionStorage.getItem("userId") ? "" : "none"}}
                      >
                        Log-Out
                      </button>
                    </li>

                </ul>
            </nav>
        )
    }
}

export default withRouter(NavBar)
