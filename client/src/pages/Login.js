import React from "react";
import API from "../utils/API";
class Login extends React.Component {
    state = {
        email: "",
        password: ""
    }
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        //icon js
    }
    handleFormSubmit = e =>{
        e.preventDefault();
        //passport.js
        var userData = {
            email: this.state.email,
            password: this.state.password
          };
      
          if (!userData.email || !userData.password) {
            return;
          }
      
          // If we have an email and password we run the loginUser function and clear the form
          API.loginUser(userData)
          .then(data => console.log(data)
          )//go to profile 
          .catch(function(err) {
            console.log(err);
          });
          emailInput.val("");
          passwordInput.val("");
    }
    render() {
        return (
            <div>
                <form>
                    email :
                    <input type="text" name="email" value={this.state.username} onChange={this.handleInputChange}></input>
                    password :
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange}></input>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}
export default Login;