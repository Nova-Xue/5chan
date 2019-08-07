import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Topic from "./pages/Topic";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTopic from "./pages/NewTopic";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/topic/?page=:num" component={Main} />
          <Route exact path="/topic/:id" component={Topic} />
          <Route exact path="/topic/:id/?commentpage=:num" component={Topic} />
          <Route exact path="/user/:id" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/newtopic" component={NewTopic} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
