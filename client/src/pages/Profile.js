import React, { Component } from "react";
import API from "../utils/API";

class Profile extends Component {
    state = {
        username : "",
        uid : "",
        loginId : "",
        topics : [],
        follower : 0,
        following : 0,
        date : ""

    }
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
        // //topics
        // API.getUserTopic(this.props.match.params.id)
        // .then(result => {
        //     alert(JSON.stringify(result.data))
        //     const array = this.state.topics;
        //     array.concat(result.data);
        //     this.setState({topics : array});
        // })
        // .catch(err=>console.log(err)
        // );
        // //followers and followings 
        // API.getUserFollower(this.props.match.params.id)
        // .then(result => alert(result.data))
        // .catch(err=>console.log(err)
        // );
        
        // API.getUserFollowing(this.props.match.params.id)
        // .then(result => alert(result.data))
        // .catch(err=>console.log(err)
        // );
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
        return (
        <div>
                <nav>
                    123
                </nav>
                <div>
                    <span>
                        {this.state.username}
                    </span>
                    {this.state.loginId !== this.state.uid && (<button>
                        Follow
                    </button>)}
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
                <button onClick={this.test}>test</button>
                <div>
                    {this.state.topics.map(topic => {
                        return (
                            <span>
                                {topic.title}
                            </span>
                        )
                    })}
                </div>
               
        </div>
        )
    }
}
export default Profile;