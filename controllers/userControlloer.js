const db = require("../models");
module.exports = (app) => {
    app.post("/user",(req,res)=>{
       //create new user
       //username 
       //password
       //email
       //location 
    });
    app.put("/user/:id",(req,res)=>{
        //update user
        //username 
        //password
        //email
        //location 
     });
     app.delete("/user/:id",(req,res)=>{
        //id === delete user by id
      });
};