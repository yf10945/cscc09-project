import "../styles.css";
import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import logo from "../Logo";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: ""
    };
    this.signin = this.signin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  
  async signin( ) {
    let username = this.state.username;
    let pwd = this.state.password;
    var fetchOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, password:pwd}),
    };
    return fetch("/login", fetchOptions)
    .then((res) => {
        if (res.status !== 200 ){
          this.setState({errorMessage: res.status + " " + res.statusText});
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
      <div className="Login main-theme">
        <img
          src={logo}
          alt="logo"
          className="icon"
        />
        <h1>Login</h1>
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
            type="password"
            name="password"
            className="form_element"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            required
          />
          <div>
            <button 
              id="signin"
              type="button" 
              name="action" 
              className="btn main-button-theme" 
              onClick={this.signin}
            >
              Sign in
            </button>
          </div>
          <h3>Don't have an account?&nbsp;
            <Link to="/signup" className="signup-link undecorated-link decorated-when-hovered-link">
                Sign up here!
            </Link>
          </h3>
        </form>
      </div>
    );
  }
};

export default LoginPage;