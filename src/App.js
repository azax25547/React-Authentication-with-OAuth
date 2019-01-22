import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Callback from "./components/Callback";
import Profile from "./components/Profile";
import Public from "./components/Public";
import Private from "./components/Private";
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
          render={props => <Private auth={this.state} {...props} />}
          path="/private"
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
