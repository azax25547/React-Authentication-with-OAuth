import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    const { login, isAuthenticated, logout, userHasScopes } = this.props.auth;

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
            {isAuthenticated() && (
              <li>
                <Link to="/private">Private</Link>{" "}
              </li>
            )}
            {isAuthenticated() && userHasScopes(["read:courses"]) && (
              <li>
                <Link to="/courses">Courses</Link>{" "}
              </li>
            )}
            <button onClick={isAuthenticated() ? logout : login}>
              {isAuthenticated() ? "Log Out" : "Log In"}
            </button>
          </ul>
        </div>
      </nav>
    );
  }
}
