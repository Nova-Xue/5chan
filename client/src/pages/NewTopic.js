import React, { Component } from "react";
import API from "../utils/API";

class NewTopic extends Component {
    state = {
        title : "",
        tbody : "",
        aid : ""
    }
    componentDidMount() {
        //get user uid as aid

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
        API.createTopic(this.state);
    }
    render() {
        return (
        <div>
                <nav>
                    123
                </nav>
               <form>
                   title :
                   <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange}></input>
                   content :
                   <input type="text" name="tbody" value={this.state.tbody} onChange={this.handleInputChange}></input>
                   <input type="submit" onSubmit={this.handleFormSubmit}></input>
               </form>

        </div>
        )
    }
}
export default NewTopic;