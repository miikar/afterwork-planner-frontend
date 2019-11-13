import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';

function Login() {
    return(
        <Router>
            <div className="App">
                <header>
                    <h1>Afterwork Planner</h1>
                </header>
            </div>
            <Switch>
                <Route exact path="/" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route path="*" render={() => (<Redirect to="/" />)} />
            </Switch>
        </Router>
    )
}

export default Login;