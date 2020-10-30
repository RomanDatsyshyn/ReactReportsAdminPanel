import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./components/Users";
import Edit from "./components/Edit";
import Messages from "./components/Messages";
import Chats from "./components/Chats";
import Channels from "./components/Channels";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/messages" component={Messages} />
          <Route exact path="/chats" component={Chats} />
          <Route exact path="/channels" component={Channels} />
          <Route exact path="/users/edit/:id" component={Edit} />
        </Switch>
      </Router>
    );
  }
}
