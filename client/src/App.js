import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Nav,NavItemLeft,NavItemRight} from "./components/Nav";
import API from "./utils/API";
import Main from "./pages/Main";
import Topic from "./pages/Topic";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTopic from "./pages/NewTopic";
import { NavBtn } from "./components/Buttons";
import "./App.css";
class App extends React.Component {
  state = {
    uid: "",
    username: ""
}
componentDidMount() {
    this.getLoginUser();
}
getLoginUser = () => {

    API.getUser()
        .then(result => {
            this.setState({ username: result.data.username || "", uid: result.data.uid || ""})
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
logout = ()=>{
    API.logout()
    .then(result =>window.location.reload())
    .catch(err=>console.log(err));
}

  render(){
    return (
      <div>
        <Nav>
                  <NavItemLeft
                      text="A logo"
                  />
                  <NavItemLeft 
                      text="Home"
                      link="/"
                  />
                  {this.state.username ? (
                      <div className="home-div">
                          <NavItemRight
                          text="New Topic"
                          link="/newtopic"/>
                          <NavItemRight text={"Hi! "+this.state.username}/>
                          <NavItemRight 
                          text="Profile"
                          link={"/user/"+this.state.uid}/>
                          <button onClick={this.logout}> Log out</button>
                      </div>
                  ) : (
                      <div className="login-div">
                          <NavItemRight text="Please Login"/>
                          {/* <NavItemRight
                          text="Sign up"
                          link="/register"/>
                          <NavItemRight
                          text="Log In"
                          link="/login"/> */}
                          <a className="btn btn-info" href="/login">Log In</a>
                          <a className="btn btn-info" href="/register">Sign Up</a>
                          
                      </div>
                  
                  )}
                  </Nav>
                  <section className="content">
                  <div className="welcome">
                    <span>Welcome to 5chan</span>
                  </div>
                  <Router>
                      <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/topic/:id" component={Topic} />
                        <Route exact path="/user/:id" component={Profile} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/newtopic" component={NewTopic} />
                      </Switch>
                    </Router>
                  </section>
                  
      </div>
    );
  }
}

export default App;
