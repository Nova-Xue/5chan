import React from "react";
import API from "../utils/API";
import { Input, FormBtn } from "../components/Form";
class Login extends React.Component {
    state = {
        email: "",
        password: "",
    }
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        //icon js
    }
    handleFormSubmit = e => {
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
            .then(result => {

                if(result.data.email){
                    if(result.data.password){
                        //this.props.history.push("/");
                        alert("logged in")
                        this.props.history.push("/");
                    }else{
                        alert("wrong password");
                    }
                }else{
                    alert("no such email");
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        this.setState({ email: "", password: "" });
    }   
        // testLogin = e =>{
        //     e.preventDefault();
        //     API.getUser().then(result =>{
        //         if(result.data.)
        //         this.props.history.push("/");
        //     });
        // }

      
    render() {
            return (
                <div>
                    <form>
                        email :
                        <Input
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            name="email" />
                        password :
                        <Input
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            name="password" />
                        <FormBtn
                            disabled={!(this.state.password && this.state.email)}
                            onClick={this.handleFormSubmit}
                        >
                            Login
                        </FormBtn>
                        <button onClick={this.testLogin}>test</button>
                    </form>
                </div>
            )
        }
        
}
export default Login;