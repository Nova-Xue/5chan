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
        commentStatus : false
    }
    componentDidMount(){
        this.loadTopic();
    }
    loadTopic = () =>{
        API.getTopicById(this.props.match.params.id)
        .then(result => {
            alert(JSON.stringify(result.data.topicbody))
            const array = this.state.comments;
            result.data.Comments.forEach(element => {
                array.push(element);
            });
            this.setState({
                tid : result.data.tid,
                title : result.data.title,
                topicbody : result.data.topicbody,
                author : result.data.author,
                comments : array
            })
        })
        .catch(err=>console.log(err));
            
    }
    getUser = ()=>{
    }
    handleComment = e =>{
        e.preventDefault();
        this.setState({commentStatus : true});
    }
    saveComment = e =>{
        alert("in save");
    }
    render (){
        const commentStatus = this.state.commentStatus;
        let commentForm;
        if (commentStatus) {
            commentForm = ( <form>
                Comment : 
                <input type="txt"/>
                <input type="submit" onClick={this.saveComment}/>
                 </form>);
        }
        return(<div>
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
               {this.state.comments? (<tr>
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