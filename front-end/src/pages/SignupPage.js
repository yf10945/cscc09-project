import React, { Component } from 'react';

import "./SignupPage.css";
import "../styles.css";
import { Link } from "react-router-dom";
import logo from "../Logo";

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: "",
          password: "",
          errorMessage: ""
        };
        this.signup = this.signup.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    async signup() {
        let username = this.state.username;
        let pwd = this.state.password;
        var fetchOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({username: username, password:pwd}),
        };
        return fetch("/signup", fetchOptions)
        .then((res) => {
            if (res.status !== 200 ){
              this.setState({errorMessage: res.status + " " +  res.statusText});
            } else {
              this.props.history.push("/dashboard");
            }
            return res;
        })
        .catch((error) => {
          this.setState({errorMessage: 'Error connecting to login api: ' + error});
        });
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
      }
      
    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div className="signup-page main-theme">
                <img
                    src={logo}
                    alt="logo"
                    className="icon"
                />
                <h1>Sign Up</h1>
                <p id="error" className="error">{this.state.errorMessage}</p>
                <form className="complex_form">
                <input
                    type="text"
                    name="username"
                    className="form_element"
                    placeholder="Username"
                    value={this.state.username} 
                    onChange={this.handleUsernameChange}
                    required
                />
                <input
                    type="text"
                    name="password"
                    className="form_element"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    required
                />
                <div>
                    <button 
                    id="signup" 
                    type="button" 
                    name="action" 
                    className="btn main-button-theme"
                    onClick={this.signup}>
                    Sign up
                    </button>
                </div>
                <h3>Already have an account?&nbsp;
                    <Link to="/login" className="login-link undecorated-link decorated-when-hovered-link">
                        Log in here!
                    </Link>
                </h3>
                </form>
            </div>
        )
    }
}

export default SignupPage
