import React, { Component } from "react"

export default class Welcome extends Component {
    render(){
        return(
            <section>
                <h1>Welcome to Nutshell</h1>
                <h3>please login or sign up</h3>
                <button onClick = { () => {
                    this.props.history.push("/welcome/login")
                }}>sign in</button>
                <button onClick = { () => {
                    this.props.history.push("/welcome/register")
                }}>sign up</button>
            </section>
        )
    }
}