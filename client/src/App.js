import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Nav, NavItemLeft, NavItemRight } from "./components/Nav";
import API from "./utils/API";
import Main from "./pages/Main";
import Topic from "./pages/Topic";
import Profile from "./pages/Profile";
import NewTopic from "./pages/NewTopic";
import { Button, Modal, Form } from "react-bootstrap";
import "./App.css";
class App extends React.Component {
    state = {
        uid: "",
        username: "",
        loginModal: false,
        registerModal :false,
        email: "",
        password: "",
        conPassword : "",
    }
    componentDidMount() {
        this.getLoginUser();
    }
    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    handleLogin = e => {
        e.preventDefault();
        //passport.js
        var userData = {
            email: this.state.email,
            password: this.state.password
        };
        if (!userData.email || !userData.password) {
            return;
        }
        // If we have an email and password we run the loginUser function and clear the form
        API.loginUser(userData)
            .then(result => {

                if (result.data.email) {
                    if (result.data.password) {
                        window.location.reload();
                    } else {
                        alert("wrong password");
                        this.refs.password.value="";
                    }
                } else {
                    alert("no such email");
                    this.refs.email.value="";
                    this.refs.password.value="";
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        this.setState({ email: "", password: "" });
    }
    handleRegister = event => {
        event.preventDefault();

        API.registerUser({
            email: this.state.email,
            password: this.state.password,
            username: this.state.username
        })
            .then(data => {
                if (data) {
                 window.location.reload();
                }
            })
            .catch(err => console.log(err));
    }
    getLoginUser = () => {

        API.getUser()
            .then(result => {
                this.setState({ username: result.data.username || "", uid: result.data.uid || "" })
            })
            .catch(err => { });
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
    checkUser = e => {
        if (!this.state.uid) {
            e.preventDefault();
            alert("you have not logged in");
        }
    }
    logout = () => {
        API.logout()
            .then(result => window.location.reload())
            .catch(err => console.log(err));
    }
    showLoginModal = () => {
        this.setState({
            loginModal: true
        });
    }
    hideLoginModal = () => {
        this.setState({
            loginModal: false
        });
    }
    showRegisterModal = () => {
        this.setState({
            registerModal: true
        });
    }
    hideRegisterModal = () => {
        this.setState({
            registerModal: false
        });
    }
    render() {
        let loginModal = (
            <Modal show={this.state.loginModal} onHide={this.hideLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome back to 5chan!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" ref="email" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter password" onChange={this.handleInputChange} ref="password"/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleLogin}>
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.hideLoginModal}>
                        Close
              </Button>
                </Modal.Footer>
            </Modal>
        );
        let registerModal = (
            <Modal show={this.state.registerModal} onHide={this.hideRegisterModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to 5chan!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleInputChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.And your email will be your account to login.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter username" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="conPassword" placeholder="Confirm Password" onChange={this.handleInputChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleRegister}>
                            Sign Up!
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.hideRegisterModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
        return (
            // div to return
            <div>
                {/* nav  */}
                <Nav>
                    <div className="left-div">
                    <span>A logo</span>
                    <a className="btn btn-info" href="/">Home</a>
                    </div>
                    {this.state.username ? (
                        <div className="right-div">
                            <span>{"Hi! " + this.state.username}</span>
                            <a className="btn btn-info" href="/newtopic">New Topic</a>
                            <a className="btn btn-info" href={"/user/" + this.state.uid}>Profile</a>
                            <a className="btn btn-info" onClick={this.logout}>Log out</a>
                        </div>
                    ) : (
                            <div className="right-div">
                                <span>Please Login</span>
                                <a className="btn btn-info" onClick={this.showLoginModal}>Log In</a>
                                <a className="btn btn-info" onClick={this.showRegisterModal}>Sign Up</a>
                            </div>

                        )}
                </Nav>
                {/* nav ends */}
                {/* modals */}
                {loginModal}
                {registerModal}
                {/* modals */}
                {/* content body */}
                <section className="content">
                    {/* welcome section */}
                    <div className="welcome">
                        <span>Welcome to 5chan</span>
                    </div>
                    {/* welcome section ends */}
                    {/* router to pages */}
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route exact path="/topic/:id" component={Topic} />
                            <Route exact path="/user/:id" component={Profile} />
                            <Route exact path="/newtopic" component={NewTopic} />
                        </Switch>
                    </Router>
                    {/* router ends */}
                </section>
                {/* content ends */}
                {/* footer */}

                {/* footer ends */}
            </div>
            // div ends
        );
    }
}

export default App;
