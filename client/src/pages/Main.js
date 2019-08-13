import React, { Component } from "react";
import API from "../utils/API";
import { Row, Col } from "../components/Grid";
const moment = require("../../node_modules/moment");
class Main extends Component {
    state = {
        topics: [],
    }
    componentDidMount() {
        this.loadTopic();

    }
    loadTopic = () => {
        API.getTopics()
            .then(result => {
                const array = this.state.topics;
                result.data.forEach(element => {
                    array.push(element);
                });
                this.setState({ topics: array });
            })
            .catch(err => console.log(err));
        //loadComCount   res => this.setState({ topics: res.data })
    }
    render() {
        return (
            <div>
                <div className="pagination">
                    <span>Pagination</span>
                </div>
                <div className="container">
                    {
                        this.state.topics.map(topic => (
                            <Row>
                                <Col grid="lg-2 author">
                                    <a href={"/user/" + topic.aid}>
                                        {topic.author}
                                    </a>
                                </Col>
                                <Col grid="lg-6 title">
                                <a href={"/topic/" + topic.tid}>{topic.title}</a>
                                </Col>
                                <Col grid="lg-2 date">
                                {moment(topic.createdAt).format("MM/DD,HH:mm")}
                                </Col>
                                <Col grid="lg-2 date">
                                {moment(topic.updatedAt).format("MM/DD,HH:mm")} by <a href={"/user/"+topic.User.uid}>{topic.User.username}</a>
                                </Col>
                            </Row>

                        ))
                    }
                </div>
            </div>)
    }
}
export default Main;