import React, { Component } from "react";
import API from "../utils/API";
import {Row,Col } from "../components/Grid";
import moment from "../../node_modules/moment";
class Profile extends Component {
    state = {
        username : "",
        uid : "",
        loginId : "",
        topics : [],
        follower : 0,
        following : 0,
        followerId : [],
        followingId : [],
        date : ""

    }
    //load relation
    componentDidMount() {
        this.loadUser();
        this.loadTopic();
        this.getUser();
    }
    loadTopic = () => {
        API.getUserTopic(this.props.match.params.id)
            .then(result => {
                //alert(JSON.stringify(result.data))
                const array = this.state.topics;
                result.data.forEach(element => {
                    array.push(element);
                });
                this.setState({topics : array});
            })
            .catch(err=>console.log(err));
    }
    loadUser = ()=>{
        //user raw query to populate this page
        // user info
        API.getUserById(this.props.match.params.id)
        .then(result => {
            this.setState({
                username : result.data.username,
                uid : result.data.uid,
                date: result.data.createdAt
            })
        })
        .catch(err=>console.log(err)
        );
      
    }
    test = ()=>{
        alert(this.state.topics);
    }
    getUser = () => {
        API.getUser()
        .then(result => {
            alert(result);
            this.setState({ loginId: result.data.uid });
        })
        .catch(err => { });
    }
    render() {
        let topicGroup;
        if (this.state.topics.length !==0) {
            topicGroup = (
                <div className="container">
                    {
                        this.state.topics.map(
                            topic => (
                                <Row>
                                    <a href={"/topic/"+topic.tid}>
                                        {topic.title}
                                    </a>
                                    <button vaule={topic.tid} onClick={this.handleTitleClick}>
                                        Delete
                                    </button>
                                </Row>
                            )
                        )
                    }
                </div>
            )
        }
        return (
        <div>
                <div>
                    <span>
                        {this.state.username}
                    </span>
                    
                    {/* follow button  unfollow button following state friends following stranger */}
                    <br/>
                    <span>
                        Join 5chan since {moment(this.state.date).format("YYYY.MM.DD")}
                    </span>
                    {/* {this.state.loginId !=="" && this.state.loginId !== this.state.uid && (<button>
                        Follow
                    </button>)} */}
                    <br/>
                    <span>
                        follower
                    </span>
                    <span>
                        {this.state.follower}
                    </span>
                    <span>
                        following
                    </span>
                    <span>
                        {this.state.following}
                    </span>
                </div>
                <div>
                    profile update
                </div>
                <button onClick={this.test}>test</button>
                <div>
                    {topicGroup}
                </div>
               
        </div>
        )
    }
}
export default Profile;