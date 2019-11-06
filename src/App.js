import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import LoginView from "./views/LoginView";
import Dashboard from "./views/Dashboard";
import CreateEvent from './views/CreateEvent';
import EventView from './views/EventView';
import { AuthContext, AuthProvider } from "./Firebase/auth";

const PrivateRoute = ({ component: RouteComponent, ...rest}) => {
  const { currentUser } = useContext(AuthContext);
  
  return(
    <Route 
      {...rest}
      render={props => 
        !!currentUser ? (
          <RouteComponent {...props} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};


function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginView} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/event/create" component={CreateEvent} />
          <PrivateRoute exact path="/events/:eventId" component={EventView} />
          <Route component={() => "HTTP 404 - Not found"} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}


export default App;
