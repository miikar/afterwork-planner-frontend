import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginView from "./views/LoginView";
import Dashboard from "./views/Dashboard";
import CreateEvent from "./views/CreateEvent";
import EventView from "./views/EventView";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./Firebase/firebase";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginView} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
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
