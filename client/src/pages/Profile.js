import React, { Component } from "react";

class Profile extends Component {
    state = {

    }
    componentDidMount() {
        this.loadTopic();
        this.loadPage();
        this.getUser();
    }
    loadTopic = () => {
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
                <nav>
                    123
                </nav>
                <div>
                    a card
                    with basic info
                </div>
                <div>
                    a table with all user post
                </div>

        </div>
        )
    }
}
export default Profile;