import React, { Component } from "react";
import API from "../utils/API";

class NewTopic extends Component {
    state = {
        title : "",
        topicbody : "",
        uid : "",
        username :""
    }
    componentDidMount() {
      this.getUser();
    }
    getUser = () => {
        
        API.getUser()
        .then(result => this.setState({username : result.data.username, uid : result.data.uid}));
    }
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    handleFormSubmit = e =>{
        e.preventDefault();
        //validate title and tbody
        API.createTopic({
            topicbody : this.state.topicbody,
            title : this.state.title,
            aid : this.state.uid,
            author : this.state.username,
            UserUid : this.state.uid
        })
        .then(()=>this.props.history.push("/"))
        .catch(err=>alert(err));
    }
    render() {
        return (
        <div>
               <form>
                   title :
                   <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange}></input>
                   author :
                   <input type="text" name="author" value={this.state.username} onChange={this.handleInputChange} readOnly></input>
                   content :
                   <input type="text" name="topicbody" value={this.state.topicbody} onChange={this.handleInputChange}></input>
                   <input type="submit" onClick={this.handleFormSubmit}></input>
               </form>

        </div>
        )
    }
}
export default NewTopic;