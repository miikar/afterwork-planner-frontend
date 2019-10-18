import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import LoginView from "./views/LoginView";
import Dashboard from "./views/Dashboard";
import CreateEvent from './views/CreateEvent';
import EventView from './views/EventView';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginView} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/event/create" component={CreateEvent} />
        <Route exact path="/events/:eventId" component={EventView} />
        <Route component={() => "HTTP 404 - Not found"} />
      </Switch>
    </Router>
  );
}

export default App;
