import React from "react";
import {Input,FormBtn} from "../components/Form";
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
                    email : 
                    <Input
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        name="email" />
                    username : 
                    <Input
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name="username" />
                    password : 
                    <Input
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name="password" />
                    confirm :
                    <Input
                        value={this.state.confirm}
                        onChange={this.handleInputChange}
                        name="confirm" />
                    
                    <FormBtn
                        // disabled={} disable check required
                        onClick={this.handleFormSubmit}
                    >
                        Sign Up
                    </FormBtn>
                </form>
            </div>
        )
    }
}
export default Register;