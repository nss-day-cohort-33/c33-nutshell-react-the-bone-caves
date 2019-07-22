import React, {Component} from 'react';
import './register.css'

export default class Register extends Component {
  render() {
    return (
      <div>
      <h1>Register</h1>
        <form>
          <input type="text" placeholder="Username" className="form-control" />
          <input type="text" placeholder="Email" className="form-control" />
          <input type="text" placeholder="Password" className="form-control" />
          <button type="submit">Register</button>
        </form>
      </div>
    )
  }
}