import React from "react";
class Register extends React.Component {
    state = {
        username : "",
        password : "",
        confirm : "",
        email : ""
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
        //regex
    }
    render(){
        return (
            <div>
                <form>
                    username : 
                    <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange}></input>
                    password : 
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange}></input>
                    confirm password : 
                    <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleInputChange}></input>
                    email : 
                    <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange}></input>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}
export default Register;