import React, { Component } from "react";
import API from "../utils/API";
import { Row, Col } from "../components/Grid";

class Topic extends Component {
    state = {
        tid : "",
        title : "",
        topicbody : "",
        aid : "",
        author : "",
        comments : [],
        commentCount : 0,
        commentStatus : false,
        cauthor : "",
        loginId : "",
        commentbody : "",
        editId : "",
        formStatus : false,
        replyId : ""
    }
    componentWillMount(){
        this.loadTopic();
        this.getLoginUser();
        this.loadComments();
    }
    getLoginUser = () =>{
        API.getUser()
            .then(result => {
                alert(result);
                this.setState({ cauthor: result.data.username, loginId: result.data.uid });
            })
            .catch(err => { });
    }
    //no comments
    loadTopic = () =>{
        API.getTopicById(this.props.match.params.id)
        .then(result => {
            //alert(JSON.stringify(result.data.topicbody))
            this.setState({
                tid : result.data.tid,
                title : result.data.title,
                topicbody : result.data.topicbody,
                author : result.data.author,
                aid : result.data.aid,
            });
        })
        .catch(err=>console.log(err));
    }
    loadComments =()=>{
        API.getComments(this.props.match.params.id)
            .then(result=>{
                const comments = this.state.comments;
                
                result.data.forEach(element => {
                    comments.push(element);
                });
                this.setState({
                    comments : comments,
                    commentCount : comments.length
                });
            })
            .catch(err=>console.log(err));
    }
    handleComment = e =>{
        e.preventDefault();
        this.setState({commentStatus : true});
    }
    handleCommentCancel = e =>{
        e.preventDefault();
        this.setState({commentStatus : false});
    }
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    deleteComment = e =>{
        const id = e.target.value;
        API.deleteComment(id)
        .then(result => {
            window.location.reload();
        })
        .catch(err=>console.log(err));
    }
    saveComment = e =>{
        alert("in save");
        e.preventDefault();
        API.createComment({
            cbody : this.state.commentbody,
            cauthor : this.state.cauthor,
            TopicTid : this.state.tid,
            UserUid : this.state.loginId
        })//not working here
        .then(result => {
            if(result){
                API.updateTopic(this.props.match.params.id,{
                    UserUid : this.state.loginId
                })
                .then(result => {
                    if (result) {
                        window.location.reload();
                    }
                })
                .catch(err=>console.log(err));
            }
        })
        .catch(err=>console.log(err));

    }
    hanldeEditClick = (e)=>{
        const editId = e.target.value;
        if(this.state.editId !== editId){
            this.setState({editId : editId});
        }else{
            this.setState({editId : ""});
        }
    }
    handleReplyClick= (e)=>{
        const replyId = e.target.value;
        alert("inclick")
        if(this.state.replyId !== replyId){
            this.setState({replyId : replyId});
        }else{
            this.setState({replyId : ""});
        }
    }
    test =()=>{
        alert(this.state.commentCount);
    }
    render (){
        const commentStatus = this.state.commentStatus;
        let commentForm;
        if (commentStatus) {
            commentForm = ( <form>
                Comment : 
                <input type="txt" name="commentbody" onChange={this.handleInputChange}/>
                <input type="submit" onClick={this.saveComment}/>
                <button onClick={this.handleCommentCancel}>
                       Cancel
                </button >
                 </form>);
        }
        return(<div>
            <button onClick={this.test}>test</button>
            <div className="container">
                <Row>
                {this.state.title}
                </Row>
                <Row>
                    <Col grid="md-3">
                    {this.state.author}should be a card
                    </Col>
                    <Col grid="md-9">
                    {this.state.topicbody}
                    {this.state.aid===this.state.loginId && (<button>Edit</button>)}
                    <button onClick={this.handleComment}>
                       Comment need check login
                   </button >
                    </Col>
                </Row>
                <Row>
                    {commentForm}
                </Row>
                {this.state.comments.length===0? (
                    <Row>
                        Be the first to Comment
                    </Row>
               ):this.state.comments.map(comment => (
                    <Row>
                        <Col grid="md-3">
                        {comment.cauthor}   should be a card
                        </Col>
                        <Col grid="md-9">
                           
                           <div className="cbody" ref={"ref"+comment.cid}>
                            {comment.cbody}
                            </div>
                            <div>
                            {comment.updateddAt}{comment.createdAt!==comment.updatedAt && (<span>Edited</span>)}
                            </div>
                           
                            {this.state.loginId !== undefined && <button value={comment.cid} onClick={this.handleReplyClick}>Reply</button>}
                            {this.state.loginId===comment.UserUid && (<button value={comment.cid} onClick={this.hanldeEditClick}>
                                        Edit</button>)}
                            {this.state.loginId===comment.UserUid && (<button value={comment.cid} onClick={this.deleteComment}>
                                        Delete</button>)}
                            {this.state.replyId===comment.cid && (
                                <form>
                                    <input name="replyTo" value={"@"+comment.cauthor} readOnly/>
                                    <input name="replybody" type="text"/>
                                    
                                    <input type="submit" onClick={this.submitReply}/>
                                    <button value={comment.cid} onClick={this.handleReplyClick}>Cancel</button>
                                </form>
                            )}
                            {this.state.editId===comment.cid && (
                                <form>

                                    <input value={comment.cbody}/>
                                    <input type="submit" onClick={this.updateComment}/>
                                    <button value={comment.cid} onClick={this.hanldeEditClick}>Cancel</button>
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