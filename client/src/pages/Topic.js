import React, { Component } from "react";
import API from "../utils/API";
import { Row, Col } from "../components/Grid";
import moment from "../../node_modules/moment";
import { Card, Form ,Button } from "react-bootstrap";
class Topic extends Component {
    state = {
        tid: "",
        title: "",
        topicbody: "",
        createdAt : "",
        updatedAt : "",
        aid: "",
        author: "",
        comments: [],
        commentCount: 0,
        commentStatus: false,
        cauthor: "",
        loginId: "",
        commentbody: "",
        editId: "",
        formStatus: false,
        replyId: "",
        replyBody: "",
    }
    componentWillMount() {
        this.loadTopic();
        this.getLoginUser();
        this.loadComments();
    }
    getLoginUser = () => {
        API.getUser()
            .then(result => {
                this.setState({ cauthor: result.data.username, loginId: result.data.uid });
            })
            .catch(err => { });
    }
    //no comments
    loadTopic = () => {
        API.getTopicById(this.props.match.params.id)
            .then(result => {
                //alert(JSON.stringify(result.data.topicbody))
                this.setState({
                    tid: result.data.tid,
                    title: result.data.title,
                    topicbody: result.data.topicbody,
                    author: result.data.author,
                    aid: result.data.aid,
                    createdAt :result.data.createdAt,
                    updatedAt : result.data.updatedAt
                });
            })
            .catch(err => console.log(err));
    }
    loadComments = () => {
        API.getComments(this.props.match.params.id)
            .then(result => {
                const comments = this.state.comments;

                result.data.forEach(element => {
                    comments.push(element);
                });
                this.setState({
                    comments: comments,
                    commentCount: comments.length
                });
            })
            .catch(err => console.log(err));
    }
    checkLogin = () => {
        if (this.state.loginId === "") alert("Please log in first!");
        //shoule be a modal
    }
    handleComment = e => {
        e.preventDefault();
         this.state.loginId === undefined ?
             alert("Please log in first!") : this.setState({ commentStatus: !this.state.commentStatus });
    }
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    deleteComment = e => {
        const id = e.target.value;
        API.deleteComment(id)
            .then(result => {
                window.location.reload();
            })
            .catch(err => console.log(err));
    }
    saveComment = e => {
        e.preventDefault();
        API.createComment({
            cbody: this.state.commentbody,
            cauthor: this.state.cauthor,
            TopicTid: this.state.tid,
            UserUid: this.state.loginId
        })
            .then(result => {
                if (result) {
                    this.updateTopicDate();
                }
            })
            .catch(err => console.log(err));
    }
    hanldeEditClick = (e) => {
        const editId = e.target.value;
        if (this.state.editId !== editId) {
            this.setState({ editId: editId });
        } else {
            this.setState({ editId: "" });
        }
    }
    handleReplyClick = e => {
        const replyId = e.target.value;
        if (this.state.replyId !== replyId) {
            this.setState({ replyId: replyId });
        } else {
            this.setState({ replyId: "" });
        }
    }
    updateTopicDate = () => {
        API.updateTopic(this.state.tid, {
            UserUid: this.state.loginId
        })
            .then(result => {
                if (result) {
                    window.location.reload();
                }
            })
            .catch(err => console.log(err));
    }
    updateComment = e => {
        e.preventDefault();
        API.updateComment(this.state.editId, {
            cbody: this.state.commentbody
        })
            .then(result => {
                if (result) {
                    this.updateTopicDate();
                }
            })
            .catch(err => console.log(err));
    }
    updateTopic = e => {
        e.preventDefault();
        API.updateTopic(this.state.tid, {
            topicbody: this.state.topicbody
        })
            .then(result => {
                if (result) {
                    this.updateTopicDate();
                }
            })
            .catch(err => console.log(err));
    }
    submitReply = e => {
        e.preventDefault();
        let replyId = this.state.replyId;
        let comments = this.state.comments;
        let replyTo;
        for (let index = 0; index < comments.length; index++) {
            if (comments[index].cid === replyId) replyTo = "@" + comments[index].cauthor + " : ";
        }
        let reply = replyTo + this.state.replyBody;
        API.createComment({
            cbody: reply,
            cauthor: this.state.cauthor,
            TopicTid: this.state.tid,
            UserUid: this.state.loginId
        })
            .then(result => {
                if (result) {
                    this.updateTopicDate();
                }
            })
            .catch(err => console.log(err));
    }
    test = () => {
        alert(this.state.commentStatus);
    }
    render() {
        return (<div>
            <button onClick={this.test}>test</button>
            <div className="container">
                {/* topci card */}
                <Card>


                </Card>
                <Row>
                    <Col grid="md-2">
                        <a href={"/user/" + this.state.aid}>{this.state.author}</a>
                    </Col>
                    <Col grid="md-10">
                        <Card>
                            <Card.Title>{this.state.title}</Card.Title>
                            <hr />
                            <Card.Body>
                                {/* edit form for topic */}
                                {this.state.editId === this.state.tid ? (
                                    // <form>
                                    //     <input name="topicbody" defaultValue={this.state.topicbody} onChange={this.handleInputChange} />
                                    //     <input type="submit" value="Save Change" onClick={this.updateTopic} />
                                    //     <button onClick={this.hanldeEditClick}>Cancel</button>
                                    // </form>
                                    <Form>
                                        <Form.Group>
                                            <Form.Control name="topicbody" defaultValue={this.state.topicbody} onChange={this.handleInputChange}>

                                            </Form.Control>
                                        </Form.Group>
                                        <Button type="submit " onClick={this.updateTopic} size="sm">
                                            Save Change
                                        </Button>
                                        <Button type="button" onClick={this.hanldeEditClick} size="sm">
                                            Cancel
                                        </Button>
                                    </Form>
                                ) :
                                    (
                                        // topic body when not updating
                                        <div>
                                            {this.state.topicbody}
                                            {/* edit button for topic */}
                                            {this.state.aid === this.state.loginId && (<Button value={this.state.tid} onClick={this.hanldeEditClick} size="sm">Edit</Button>)}
                                        </div>
                                    )}
                            </Card.Body>
                            <Card.Footer>
                                Posted At {moment(this.state.createdAt).format("YYYY/MM/DD,HH:mm:ss")}
                                {this.state.createdAt !== this.state.updatedAt && "  Edited at "+moment(this.state.updatedAt).format("YYYY/MM/DD,HH:mm:ss")}
                            </Card.Footer>
                        </Card>
                        <div>
                        <Button onClick={this.handleComment} size="sm">Comment</Button>
                        </div>
                        { this.state.commentStatus &&
                            (
                                <div>
                                <Form>
                                <Form.Group>
                                <Form.Label>
                                    Write Your Comment Here : 
                                </Form.Label>
                                <Form.Control type="textarea" name="commentbody" onChange={this.handleInputChange} placeholder="At least 8 letters"/>
                                </Form.Group>
                                <Button type="submit" onClick={this.saveComment} size="sm">Save</Button>
                                <Button type="button" onClick={this.handleComment} size="sm">Cancel</Button>
                                </Form>
                                </div>
                            )

                        }

                    </Col>

                </Row>
                {this.state.comments.length === 0 ? (
                    <Row>
                        Be the first to Comment
                    </Row>
                ) : this.state.comments.map(comment => (
                    <Row>
                        <Col grid="md-2">
                            <a href={"/user/" + comment.UserUid}>
                                {comment.cauthor}
                            </a>
                        </Col>
                        <Col grid="md-10">

                            {this.state.editId === comment.cid ? (

                                // comment update form
                                <form>
                                    <input name="commentbody" defaultValue={comment.cbody} onChange={this.handleInputChange} />
                                    <input type="submit" value="Save change" onClick={this.updateComment} />
                                    <button value={comment.cid} onClick={this.hanldeEditClick}>Cancel</button>
                                </form>
                                // comment update form
                            ) :
                                (
                                    <div>
                                        {comment.cbody}
                                    </div>
                                )}
                            {/* to show updated status */}
                            <div>
                                {comment.updatedAt}{comment.createdAt !== comment.updatedAt && (<span>Edited at {moment(comment.updatedAt).format("YYYY/MM/DD,HH:mm:SS")}</span>)}
                            </div>
                            {/* reply button of comment*/}
                            {this.state.loginId !== undefined && <button value={comment.cid} onClick={this.handleReplyClick}>Reply</button>}
                            {/* edit button of comment */}
                            {this.state.loginId === comment.UserUid && (<button value={comment.cid} onClick={this.hanldeEditClick}>
                                Edit</button>)}
                            {/* delete button of comment */}
                            {this.state.loginId === comment.UserUid && (<button value={comment.cid} onClick={this.deleteComment}>
                                Delete</button>)}
                            {/* reply from */}
                            {this.state.replyId === comment.cid && (
                                <form>
                                    <input name="replyTo" value={"@" + comment.cauthor} readOnly />
                                    <input name="replyBody" type="text" onChange={this.handleInputChange} />
                                    {/* button to submit reply */}
                                    <input type="submit" value="Post Reply" onClick={this.submitReply} />
                                    <button value={comment.cid} onClick={this.handleReplyClick}>Cancel</button>
                                </form>
                            )}


                        </Col>
                    </Row>
                ))}
            </div>
        </div>)
    }
}
export default Topic;