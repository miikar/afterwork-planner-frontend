import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Account from "./views/Account";
import CreateEvent from "./views/CreateEvent";
import EventView from "./views/EventView";

import DateVote from "./views/DateVote";

class App extends React.Component {

  componentDidMount() {
    // TODO: set user state to localstorage here
  }

  render() {
    return (
        <Router>
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/event/create" component={CreateEvent} />
              <Route exact path="/events/:eventId" component={EventView} />
              <Route exact path="/test" component={DateVote} />
              <Route path="*" render={() => (<Redirect to="/dashboard" />)} />
              {/* <Route component={() => "HTTP 404 - Not found"} /> */}
            </Switch>
        </Router>
    );
  }
}


export default App;
