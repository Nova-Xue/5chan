import React, { Component } from "react";

class Profile extends Component {
    state = {
        username : "",

    }
    componentDidMount() {
        
    }
    loadTopic = () => {
        //loadComCount
    }
    loadPage = () => {

    }
    loadUser = ()=>{
        //user raw query to populate this page
        // I need username 
        //posts  
        //one query
        //followers and followings 
        //two queries
    }
    getUser = () => {
        //passport.js
    }
    render() {
        return (
        <div>
                <nav>
                    123
                </nav>
                <div>
                    a card
                    with basic info
                    and form to update
                </div>
                <div>
                    a table with all user post
                </div>

        </div>
        )
    }
}
export default Profile;