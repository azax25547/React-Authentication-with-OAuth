import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Callback from "./components/Callback";
import Profile from "./components/Profile";
import Public from "./components/Public";
import Private from "./components/Private";
import Courses from "./components/Courses";
import Auth from "./Auth/Auth";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = new Auth(props.history);
  }
  render() {
    return (
      <>
        <Nav auth={this.state} />
        <Route
          exact={true}
          render={props => <Home auth={this.state} {...props} />}
          path="/"
        />
        <Route
          render={props => <Callback auth={this.state} {...props} />}
          path="/callback"
        />
        <Route
          render={props =>
            this.state.isAuthenticated() ? (
              <Private auth={this.state} {...props} />
            ) : (
              this.state.login()
            )
          }
          path="/private"
        />
        <Route
          render={props =>
            this.state.isAuthenticated() &&
            this.state.userHasScopes(["read:courses"]) ? (
              <Courses auth={this.state} {...props} />
            ) : (
              this.state.login()
            )
          }
          path="/courses"
        />
        <Route
          render={
            this.state.isAuthenticated() ? (
              props => <Profile auth={this.state} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
          path="/profile"
        />
        <Route component={Public} path="/public" />
      </>
    );
  }
}

export default App;
