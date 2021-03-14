// import "./styles.css";
import React from "react";
import { withRouter } from "react-router-dom";



class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    };
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  async signup() {
    let email = this.state.email;
    let pwd = this.state.password;
    var fetchOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password:pwd}),
    };
    return fetch("/signup", fetchOptions)
    .then((res) => {
        if (res.status !== 200 ){
          this.setState({errorMessage: res.status + " " +  res.statusText});
        } else {
          this.props.history.push("/playlists");
        }
        return res;
    })
    .catch((error) => {
      this.setState({errorMessage: 'Error connecting to login api: ' + error});
    });
  }
  
  async signin( ) {
    let email = this.state.email;
    let pwd = this.state.password;
    var fetchOptions = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password:pwd}),
    };
    return fetch("/login", fetchOptions)
    .then((res) => {
        if (res.status !== 200 ){
          this.setState({errorMessage: res.status + " " + res.statusText});
        } else {
          this.props.history.push("/playlists");
        }
        return res;
    })
    .catch((error) => {
      this.setState({errorMessage: 'Error connecting to login api: ' + error});
    });
  }
  
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }
  
  render() {
    return (
      <div className="Login">
        <img
          src="http://cdn.onlinewebfonts.com/svg/img_496903.png"
          alt="logo"
          className="icon"
        />
        <p id="error" className="error">{this.state.errorMessage}</p>
        <form className="complex_form">
          <input
            type="text"
            name="username"
            className="form_element"
            placeholder="Enter a username"
            value={this.state.email} 
            onChange={this.handleEmailChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form_element"
            placeholder="Enter a password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            required
          />
          <div>
            <button 
              id="signin"
              type="button" 
              name="action" 
              className="btn" 
              onClick={this.signin}
            >
              Sign in
            </button>
            <button 
              id="signup" 
              type="button" 
              name="action" 
              className="btn" 
              onClick={this.signup}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
};

export default LoginPage;