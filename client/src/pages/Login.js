import React from "react";
class Login extends React.Component {
    state = {
        username: "",
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
    }
    render() {
        return (
            <div>
                <form>
                    username :
                    <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange}></input>
                    password :
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange}></input>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}
export default Login;