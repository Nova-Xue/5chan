import axios from "axios";
export default {
    getTopics : ()=> axios.get("api/topic"),
    getTopic : (id) => axios.get("/topic/"+id),
    updateTopic : (id) =>axios.put("/topic/"+id),
    deleteTopic : (id) => axios.delete("/topic/"+id),
    loginUser : (data) =>axios.post("/api/login", data),
}