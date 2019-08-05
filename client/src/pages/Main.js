import React, { Component } from "react";
import API from "../utils/API";
class Main extends Component {
    state = {
        topics: [],
        userId: ""
    }
    componentDidMount() {
        this.loadTopic();
        this.loadPage();
        this.getUser();
    }
    loadTopic = () => {
        API.getTopics()
            .then(res => this.setState({ topics: res.data }))
            .catch(err => console.log(err));
        //loadComCount
    }
    loadPage = () => {

    }
    getUser = () => {
        //passport.js
    }
    render() {
        return (
            <div>
                <nav><a href="/">Home</a>|<a href="/profile">Profile</a>|<a href="login">login</a>|<a href="register">register</a></nav>

                <table>
                    {this.state.topics.map(topic => (<tr>
                        {topic}
                    </tr>))}
                    <tr>row</tr>
                    <tr>row</tr>
                    <tr>row</tr>
                    <tr>row</tr>
                </table>
            </div>)
    }
}
export default Main;