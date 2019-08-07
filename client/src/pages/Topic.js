import React, { Component } from "react";
import API from "../utils/API";
class Topic extends Component {
    state = {
        tid : "",
        title : "",
        topicbody : "",
        aid : "",
        author : "",
        comments : [],
        commentStatus : false,
        cauthor : "",
        loginId : "",
        commentbody : ""
    }
    componentDidMount(){
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
                    comments : comments
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
    //no update
    saveComment = e =>{
        alert("in save");
        e.preventDefault();
        API.createComment({
            cbody : this.state.commentbody,
            cauthor : this.state.cauthor,
            TopicTid : this.state.tid,
            UserUid : this.state.loginId
        })
        .then(result => {
            API.updateTopic(this.props.match.params.id,{
                UserUid : this.state.loginId
            }).then(result=> result&& window.location.reload()).catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));

    }
    test =()=>{
        alert(this.state.comments);
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
            <div>
            {this.state.author}
            </div>
            <table>
               <tr>
                   <td>
                   {this.state.title}
                   </td>
               </tr>
               <tr>
                   <td>
                   {this.state.topicbody}
                   </td>
                   <button onClick={this.handleComment}>
                       Comment
                   </button >
                   
               </tr>
               {this.state.comments.length===0? (<tr>
                   Be the first to comment
               </tr>):
                   this.state.comments.map(comment => (
                            <tr>
                                <td>
                                    {comment.UserUid}
                                </td>
                                <td>
                                    {comment.cbody}
                                </td>
                                <td>
                                    {comment.createdAt}
                                </td>
                            </tr>
                   )) }
            </table>
            {commentForm}
        </div>)
    }
}
export default Topic;