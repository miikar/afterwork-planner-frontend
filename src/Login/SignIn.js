import React, { Component } from 'react';

import './SignIn.css';
import FormInput from "./form-input.component";
import CustomButton from "./custom-button.component";

import { firebaseApp, signInWithGoogle } from '../Firebase/firebase';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };
    }

    handleLogin = (e) => {
        e.preventDefault()

        const { email, password } = this.state

        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error))
    }

    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };

    render() {
        return (
            <div>
                <div className="sign-in">
                    <h2>I already have an account</h2>
                    <span>Sign in with your email and password</span>
                    <form onSubmit={this.handleLogin}>
                        <FormInput
                            name="email"
                            type="email"
                            handleChange={this.handleChange}
                            value={this.state.email}
                            label="email"
                            required
                        />
                        <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="password"
                        required
                        />
                        <div className="buttons">
                        <CustomButton type="submit"> Sign in </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                        </div>
                    </form>
                    <div>
                        <a href="/signup">Don't have an account?</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;