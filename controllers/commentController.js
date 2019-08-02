const db = require("../models");
module.exports = (app) => {
    app.post("/comment/:id",(req,res)=>{
      //id === topicId
    });
    app.delete("/comment/:id",(req,res)=>{
        //id === deletecommentby id 
      });
};