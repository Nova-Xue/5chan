import React, { Component } from "react";
import API from "../utils/API";
import { Row ,Col} from "../components/Grid";
import { Form , Button} from "react-bootstrap";

class NewTopic extends Component {
    state = {
        title : "",
        topicbody : "",
        uid : "",
        username :""
    }
    componentDidMount() {
      this.getUser();
    }
    getUser = () => {
        API.getUser()
        .then(result => {
            if(result.data.uid !==  undefined){
                this.setState({username : result.data.username, uid : result.data.uid});
            }else{
                window.location.href="/";
            }
        });
    }
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    handleFormSubmit = e =>{
        e.preventDefault();
        //validate title and tbody
        let topicBody = this.state.topicbody;
        let title = this.state.title;
        if (title.length<5) {
            alert("Title can not be less than 5 letters");
            return
        }
        if (topicBody.length<15) {
            alert("Content can not be less than 15 letters");
            return
        }
        API.createTopic({
            topicbody : this.state.topicbody,
            title : this.state.title,
            aid : this.state.uid,
            author : this.state.username,
            UserUid : this.state.uid
        })
        .then(()=>this.props.history.push("/"))
        .catch(err=>alert(err));
    }
    render() {
        return (
        <div className="container">
               <Row>
                   <Col grid="md-12">
                   <Form>
                    <Form.Group>
                        <Form.Label>
                            Title :
                        </Form.Label>
                        <Form.Control name="title" placeholder="Enter your title (Must be longer than 5 letters)" onChange={this.handleInputChange}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Author :
                        </Form.Label>
                        <Form.Control name="author" value={this.state.username} readOnly >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Content :
                        </Form.Label>
                        <Form.Control name="topicbody" placeholder="Enter your content (Must be longer than 15 letters)" as="textarea" rows="5" onChange={this.handleInputChange} >
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit" onClick={this.handleFormSubmit} size="sm">
                            Post
                    </Button>
                   </Form>
                   </Col>
               </Row>

        </div>
        )
    }
}
export default NewTopic;