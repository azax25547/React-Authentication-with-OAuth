import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Callback from "./components/Callback";
import Profile from "./components/Profile";
import Auth from "./Auth/Auth";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = new Auth(props.history);
  }
  render() {
    return (
      <>
        <Nav />
        <Route
          exact={true}
          render={props => <Home auth={this.state} {...props} />}
          path="/"
        />
        <Route
          render={props => <Callback auth={this.state} {...props} />}
          path="/callback"
        />
        <Route component={Profile} path="/profile" />
      </>
    );
  }
}

export default App;
