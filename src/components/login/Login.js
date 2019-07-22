import React, {Component} from 'react';
import './Login.css'

export default class Login extends Component {
  render() {
    return (
      <div>
      <h1>Login</h1>
        <form>
          <input type="text" placeholder="Username" className="form-control" />
          <input type="text" placeholder="Password" className="form-control" />
          <button type="submit">Log In</button>
          <label htmlFor="Remember Me">
            <input id="rememberMe"
              name="rememberMe"
              value="remember"
              type="checkbox"
              onClick={
                () => {
                  this.setState(
                    {rememberMe: true}
                  )
              }
            }/>
            Remember Me
          </label>
        </form>
      </div>
    )
  }
}