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
        if (this.state.commentbody.length<8) {
            alert("Comment can not be less than 8 letters");
            return
    }
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
        if (this.state.commentbody.length<8) {
            alert("Comment can not be less than 8 letters");
            return
    }
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
        if(this.state.topicbody.length<15){
            alert("Topic content can not be less than 15 letters");
            return
        }
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
        
        if (this.state.replyBody.length<8) {
                alert("Reply can not be less than 8 letters");
                return
        }
        let replyId = this.state.replyId;
        let comments = this.state.comments;
        
        let replyTo;
        for (let index = 0; index < comments.length; index++) {
            // <a href="/user/uid">replyTo</a>
            if (comments[index].cid === replyId) replyTo = "<a href='/user/"+replyId+"'>@" + comments[index].cauthor+"</a>"+ " : ";
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
        return (
        <div>
            <div className="pagination">
            Pagination
            </div>
            <div className="container">
                {/* topci card */}
                
                <Row>
                    <Col grid="lg-2">
                        <a href={"/user/" + this.state.aid}>{this.state.author}</a>
                    </Col>
                    <Col grid="lg-10">
                        <Card>
                            <Card.Title>{this.state.title}</Card.Title>
                            <hr />
                            <Card.Body>
                                {/* edit form for topic */}
                                {this.state.editId === this.state.tid ? (
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
                                <div className="date">
                                Posted At {moment(this.state.createdAt).format("YYYY/MM/DD,HH:mm:ss")}
                                {this.state.createdAt !== this.state.updatedAt && "  Edited at "+moment(this.state.updatedAt).format("YYYY/MM/DD,HH:mm:ss")} 
                                </div>
                            </Card.Footer>
                        </Card>
                        <div>
                        <Button onClick={this.handleComment} size="sm">Comment</Button>
                        </div>
                        { this.state.commentStatus &&
                            (
                                // comment form
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
                        <Col grid="lg-2">
                            <a href={"/user/" + comment.UserUid}>
                                {comment.cauthor}
                            </a>
                        </Col>
                        <Col grid="lg-10">

                            {this.state.editId === comment.cid ? (
                                //edit comment form
                                <Form>
                                    <Form.Control name="commentbody" defaultValue={comment.cbody} onChange={this.handleInputChange} >

                                    </Form.Control>
                                    <Button type="submit" onClick={this.updateComment} size="sm">Save Change</Button>
                                    <Button value={comment.cid} onClick={this.hanldeEditClick} size="sm">Cancel</Button>
                                </Form>

                                
                            ) :
                                (
                                    //comment body 
                                    <div dangerouslySetInnerHTML={{ __html: comment.cbody }} />
                                )}
                            {/* to show updated status */}
                            <div className="date">
                                {moment(comment.updatedAt).format("YYYY/MM/DD,HH:mm:SS")}{comment.createdAt !== comment.updatedAt && (<span>Edited</span>)}
                            </div>
                            {/* reply button of comment*/}
                            {this.state.loginId !== undefined && <Button value={comment.cid} onClick={this.handleReplyClick} size="sm">Reply</Button>}
                            {/* edit button of comment */}
                            {this.state.loginId === comment.UserUid && (<Button value={comment.cid} onClick={this.hanldeEditClick} size="sm">
                                Edit</Button>)}
                            {/* delete button of comment */}
                            {this.state.loginId === comment.UserUid && (<Button value={comment.cid} onClick={this.deleteComment} size="sm">
                                Delete</Button>)}
                            {/* reply from */}
                            {this.state.replyId === comment.cid && (
                                //reply form 
                                <Form>
                                    <Form.Label>
                                        Reply to {"@"+comment.cauthor}
                                    </Form.Label>
                                    <Form.Control name="replyBody" type="text" onChange={this.handleInputChange} placeholder="At least 8 letters">
                                    </Form.Control>
                                    <Button type="submit" onClick={this.submitReply} size="sm">
                                        Post Reply
                                    </Button>
                                    <Button value={comment.cid} onClick={this.handleReplyClick} size="sm">
                                        Cancel
                                    </Button>
                                </Form>
                                //reply form
                            )}


                        </Col>
                    </Row>
                ))}
            </div>
        </div>)
    }
}
export default Topic;