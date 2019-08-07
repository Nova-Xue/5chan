import React, { Component } from "react";
import API from "../utils/API";
class Main extends Component {
    state = {
        topics: [],
        uid: "",
        username: ""
    }
    componentDidMount() {
        // this.loadTopic();
        // this.loadPage();
        this.loadTopic();
        this.getLoginUser();

    }
    getLoginUser = () => {


        API.getUser()
            .then(result => this.setState({ username: result.data.username, uid: result.data.uid }))
            .catch(err => { });
    }
    loadTopic = () => {
        API.getTopics()
            .then(result => {
                // alert(JSON.stringify(result.data)); 
                // alert(this.state.topics);
                // alert(this.state.topics.concat(JSON.stringify(result.data)));
                const array = this.state.topics;
                result.data.forEach(element => {
                    array.push(element);
                });
                this.setState({ topics: array });
            })
            .catch(err => console.log(err));
        //loadComCount   res => this.setState({ topics: res.data })
    }
    checkUser = e => {
        if (!this.state.uid) {
            e.preventDefault();
            alert("you have not logged in");
        }
    }
    render() {
        return (
            <div>
                <nav><a href="/">Home</a>|<a href={"/user/" + this.state.uid} onClick={this.checkUser}>Profile</a>|<a href="login">login</a>|<a href="register">register</a>
                    {this.state.username ? (<a>Welcome {this.state.username}</a>) : (<a>Please Login</a>)}
                    <a href="/newtopic" onClick={this.checkUser}>New Topic</a>
                </nav>
                {/* table component and conditional render */}
                <table>
                    <tr>
                        <th>
                            author
                   </th>
                        <th>
                            title
                   </th>
                        <th>
                            createdAt
                   </th>
                        <th>
                            last reply
                   </th>
                    </tr>
                    <tbody>
                        {this.state.topics.map(topic => (
                            <tr>
                                <td>
                                    <a href={"/user/" + topic.aid}>
                                        {topic.author}
                                    </a>

                                </td>
                                <td>
                                    <a href={"/topic/" + topic.tid}>{topic.title}</a>
                                </td>
                                <td>

                                    {topic.createdAt}
                                </td>
                                <td>
                                    {topic.updatedAt} by <a href={"/user/"+topic.User.uid}>{topic.User.username}</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>)
    }
}
export default Main;