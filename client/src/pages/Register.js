import React from "react";
import {Input,FormBtn} from "../components/Form";
import API from "../utils/API";
import { Redirect } from 'react-router-dom'
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
    handleFormSubmit = event =>{
        event.preventDefault();
        //passport.js
        //regex
        //alert(this.state);
        
        API.registerUser({
            email : this.state.email,
            password : this.state.password,
            username : this.state.username
        })
        .then(data=>{
            if (data) {
                //extra logic in register
                this.props.history.push("/login");
            }
        })
        .catch(err=>console.log(err));
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
                    <input type="submit" onClick={this.handleFormSubmit}/>
                    {/* <FormBtn
                        // disabled={} disable check required
                        
                        onClick={this.handleFormSubmit}
                    >
                        Sign Up
                    </FormBtn> */}
                </form>
            </div>
        )
    }
}
export default Register;