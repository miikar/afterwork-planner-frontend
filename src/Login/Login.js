import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';
import { BasicHeader } from '../components/Navbar/Navbars';

function Login() {
    return(
        <Router>
            <div className="App">
                 { BasicHeader({})}
            </div>
            <div className="col-md-6 offset-md-3 d-flex justify-content-center">
                <Switch> 
                    <Route exact path="/" component={SignIn}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route path="*" render={() => (<Redirect to="/" />)} />
                </Switch>
            </div>
        </Router>
    )
}

export default Login;