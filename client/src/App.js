import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import SignUp from "./components/SignUp/SignUp";
import Users from "./components/Users/Users";

const App = () => (
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/chat" exact component={Chat} />
    <Route path="/users" exact component={Users} />
    <Route path="/registration" exact component={SignUp} />
  </Router>
);

export default App;
