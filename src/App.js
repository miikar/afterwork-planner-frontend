import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import LoginView from "./views/LoginView";
import Dashboard from "./views/Dashboard";
import CreateEvent from './views/CreateEvent';
import EventView from './views/EventView';
import { auth } from "./Firebase/firebase";
import { AuthContext } from "./Firebase/auth";


class WithAuthorization extends React.Component {

}


const PrivateRoute = ({ component: Component, ...rest}) => {
  const { currentUser } = useContext(AuthContext);
  
  return(
    <Route 
      {...rest}
      render={props => 
        !!currentUser ? (
          <RouteComponent {...props} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((authUser) => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null })
    })
  }

  render() {
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
}


export default App;
