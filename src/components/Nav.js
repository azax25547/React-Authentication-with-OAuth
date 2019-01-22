import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    const { login, isAuthenticated, logout } = this.props.auth;

    return (
      <nav>
        <div className="body">
          <ul>
            <li>
              <Link to="/">Home</Link>{" "}
            </li>
            <li>
              <Link to="/profile">Profile</Link>{" "}
            </li>
            <li>
              <Link to="/public">Public</Link>{" "}
            </li>
            <li>
              <Link to="/private">Private</Link>{" "}
            </li>
            <button onClick={isAuthenticated() ? logout : login}>
              {isAuthenticated() ? "Log Out" : "Log In"}
            </button>
          </ul>
        </div>
      </nav>
    );
  }
}
