import React, { Component } from 'react';
import "../App.css";
import './LoginView.css';

class LoginView extends Component {

    handleLogin = (event) => {
        event.preventDefault();
    }
    render() {    
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Afterwork Planner</h1>
                    <h4>Log in</h4>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button onClick={this.handleLogin}>Log In</button>
                    </form>
                </header>
            </div>
        );
    }
}

export default LoginView;