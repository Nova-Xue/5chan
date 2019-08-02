const db = require("../models");
module.exports = (app) => {
    app.post("/topic",(req,res)=>{
       //tid =uuid
       //title
       //tbody
       //aid == author uuid
       //userId default == aid 
    });
    app.put("/topic/:id",(req,res)=>{
        //update last reply
        //id == reply uuid
     });
   //   app.delete("/user/:id",(req,res)=>{
   //      //id === delete user by id
   //    });
};