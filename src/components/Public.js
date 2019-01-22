import React, { Component } from "react";

export default class Public extends Component {
  state = {
    message: "",
    error: ""
  };

  componentDidMount() {
    fetch("/public")
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
          error: err
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
