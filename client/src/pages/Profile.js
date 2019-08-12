import React, { Component } from "react";
import API from "../utils/API";
import { Row, Col } from "../components/Grid";
import moment from "../../node_modules/moment";
class Profile extends Component {
    state = {
        username: "",
        uid: "",
        loginId: "",
        topics: [],
        followerId: [],
        followingId: [],
        date: ""

    }
    //load relation
    componentDidMount() {
        this.loadUser();
        this.loadTopic();
        this.getUser();
        this.loadFollower();
        this.loadFollowing();
    }
    loadTopic = () => {
        API.getUserTopic(this.props.match.params.id)
            .then(result => {
                //alert(JSON.stringify(result.data))
                const array = this.state.topics;
                result.data.forEach(element => {
                    array.push(element);
                });
                this.setState({ topics: array });
            })
            .catch(err => console.log(err));
    }
    loadUser = () => {
        // user info
        API.getUserById(this.props.match.params.id)
            .then(result => {
                this.setState({
                    username: result.data.username,
                    uid: result.data.uid,
                    date: result.data.createdAt
                })
            })
            .catch(err => console.log(err)
            );

    }
    loadFollowing = () => {
        API.getUserFollowing(this.props.match.params.id)
            .then(result => {
                const array = this.state.followingId;
                result.data.forEach(element => {
                    array.push(element.followId);
                });
                this.setState({
                    followingId : array
                });
            })
            .catch(err => console.log(err));
    }
    loadFollower = () => {
        API.getUserFollower(this.props.match.params.id)
            .then(result => {
                const array = this.state.followerId;
                result.data.forEach(element => {
                    array.push(element.UserUid);
                });
                this.setState({
                    followerId : array
                });
            })
            .catch(err => console.log(err));
    }

    getUser = () => {
        API.getUser()
            .then(result => {
                //alert(result);
                this.setState({ loginId: result.data.uid });
            })
            .catch(err => { });
    }
    followUser = () => {
        API.followUser({
            followId: this.state.uid,
            UserUid: this.state.loginId
        })
            .then(result => window.location.reload())
            .catch(err => console.log(err));
    }
    unfollowUser = () => { 
        API.unfollowUser({
            followId : this.state.uid,
            UserUid : this.state.loginId
        })
        .then(result => window.location.reload())
        .catch(err => console.log(err));
    }
    relation = () => {
        if (this.state.loginId===undefined ||this.state.loginId === this.state.uid) return "";
        if (this.state.followerId.includes(this.state.loginId)) {
            if (this.state.followingId.includes(this.state.loginId)) {
                return "Friend"
            } else {
                return "Following"
            }
        } else if (this.state.followingId.includes(this.state.loginId)) {
            return "Being followed"
        } else {
            return "Stranger"
        }
    }
    test = () => {
        alert(this.state.uid);
    }
    render() {
        let btnDiv;
        switch (this.relation()) {
            case "Friend":
                btnDiv = (<div>
                    <span>
                        Friend
                        </span>
                    <button onClick={this.unfollowUser}>Unfollow</button>
                </div>)
                break;
            case "Following":
                btnDiv = (
                    <div>
                        <span>
                            You are following this user
                        </span>
                        <button onClick={this.unfollowUser}>Unfollow</button>
                    </div>
                )
                break;
            case "Being followed":
                btnDiv = (
                    <div>
                        <span> Following you</span>
                        <button onClick={this.followUser}>Follow</button>
                    </div>
                )
                break;
            case "Stranger":
                btnDiv = (
                    <div>
                        <button onClick={this.followUser}>Follow</button>
                    </div>

                )
                break;
            case "":
                btnDiv = (
                    <div>

                    </div>
                )
                break;
        }

        return (
            <div>
                <div>
                    <span>
                        {this.state.username}
                    </span>
                    {/* conditional button */}
                    {btnDiv}
                    {/* follow button  unfollow button following state friends following stranger */}
                    <br />
                    <span>
                        Join 5chan since {moment(this.state.date).format("YYYY.MM.DD")}
                    </span>

                    <br />
                    <span>
                        follower
                    </span>
                    <span>
                        {this.state.followerId.length}
                    </span>
                    <span>
                        following
                    </span>
                    <span>
                        {this.state.followingId.length}
                    </span>
                </div>
                <div>
                    profile update
                </div>
                <button onClick={this.test}>test</button>
                <div className="container">
                    {this.state.topics.length === 0 ? (
                        <span>
                            You don't have any topic
                    </span>

                    ) :
                        this.state.topics.map(
                            topic => (
                                <Row>
                                    <a href={"/topic/" + topic.tid}>
                                        {topic.title}
                                    </a>
                                    <span>
                                        Posted at {moment(topic.createdAt).format("YYYY/MM/DD,HH:mm:ss")}
                                    </span>
                                    {this.state.loginId === this.state.uid && (
                                        <button vaule={topic.tid} onClick={this.handleTitleClick}>
                                            Delete
                                    </button>)}
                                </Row>
                            )
                        )
                    }
                </div>

            </div>
        )
    }
}
export default Profile;