import React, { Component } from "react";
import EditableLabel from 'react-inline-editing';

export default class MessageCard extends Component {
  constructor(props){
    super(props);

    this._handleFocus = this._handleFocus.bind(this);
    this._handleFocusOut = this._handleFocusOut.bind(this);
  }
  
  _handleFocus(text) {
    console.log('Focused with text: ' + text);
}

_handleFocusOut(text) {
    console.log('Left editor with text: ' + text);
}
  render() {
    return (
      <div key={this.props.message.id} className="card">
        <div className="card-body">
          <div className="card-title">
            <h5>{this.props.message.username}</h5>
            <EditableLabel text={this.props.message.message} onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut}>{this.props.message.message}</EditableLabel>
            <a href="#"
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
