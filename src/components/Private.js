import React, { Component } from "react";

export default class Private extends Component {
  state = {
    message: "",
    error: ""
  };

  componentDidMount() {
    fetch("/private", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Network Response was not OK");
      })
      .then(res =>
        this.setState({
          message: res.message
        })
      )
      .catch(err =>
        this.setState({
          message: err.message
        })
      );
  }

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
