import React, { Component } from "react";
import API from "../utils/API";
class Topic extends Component {
    state = {

    }
    componentDidMount(){
        this.loadTopic();
        this.getUser();
    }
    loadTopic = () =>{
        API.getTopicById(this.props.match.params.id)
            //loadComCount
    }
    getUser = ()=>{
        //passport.js
    }
    render (){
        return(<div>
            <table>
                <tr>
                    first row 
                    topic 
                </tr>
                <tr>
                    rest are comments
                </tr>
            </table>
        </div>)
    }
}
export default Topic;