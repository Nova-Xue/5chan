import axios from "axios";
export default {
    getTopics : ()=> axios.get("/api/topic"),
    getTopicById : (id) => axios.get("/api/topic/"+id),
    updateTopic : (id) =>axios.put("/api/topic/"+id),
    deleteTopic : (id) => axios.delete("/api/topic/"+id),
    createTopic : (data) => axios.post("/api/topic",data),
    loginUser : (data) =>axios.post("/api/login", data),
    registerUser : (data) =>axios.post("/api/user",data),
    viewUser : (id) => axios.get("api/user/"+id),
    createComment : (data) => axios.post("/api/comment", data),
    updateComment : (id,data) => axios.put("/api/comment"+id ,+data),
    deleteCommet : (id) => axios.delete("/api/comment" + id),
    getUser : ()=> axios.get("/api/user_data"),
    
}